import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import {
  contactEmailHtml,
  isAllowedRequestOrigin,
  validateContactSubmission,
} from "@/lib/contact";
import { SITE_EMAIL } from "@/lib/site";

const MAX_REQUEST_BYTES = 20_000;

async function readRequestBody(req: NextRequest): Promise<string | null> {
  const reader = req.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return text + decoder.decode();
      bytes += value.byteLength;
      if (bytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("content-type")?.split(";", 1)[0] !== "application/json") {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
    }

    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: "Request is too large" }, { status: 413 });
    }

    const origin = req.headers.get("origin");
    if (!isAllowedRequestOrigin(origin, req.nextUrl.origin)) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }

    const requestBody = await readRequestBody(req);
    if (requestBody === null) {
      return NextResponse.json({ error: "Request is too large" }, { status: 413 });
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const validation = validateContactSubmission(parsedBody);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const submission = validation.data;

    // Quietly accept honeypot submissions so bots do not learn how to bypass it.
    if (submission.website) {
      return NextResponse.json({ success: true });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Contact form is missing RESEND_API_KEY");
      return NextResponse.json({ error: "Message delivery is temporarily unavailable" }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.CONTACT_FROM_EMAIL || "Vadalkar Website <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL || SITE_EMAIL;

    const subject = submission.source === "Careers page"
      ? `Career Enquiry — ${submission.name}`
      : `New Enquiry: ${submission.service || "General"} — ${submission.name}`;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: submission.email,
      subject,
      html: contactEmailHtml(submission),
    });

    if (error) {
      console.error("Contact email delivery failed");
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    // Post to Google Sheets (optional)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      // Email has already been delivered. An optional log failure must not ask
      // the visitor to resend the enquiry, and a slow log must not hold it open.
      try {
        const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(3_000),
          body: JSON.stringify({
            name: submission.name,
            email: submission.email,
            phone: submission.phone,
            service: submission.service,
            message: submission.message,
            source: submission.source,
            timestamp: new Date().toISOString(),
          }),
        });
        if (!sheetsResponse.ok) {
          console.error("Google Sheets webhook error:", sheetsResponse.status);
        }
      } catch {
        console.error("Google Sheets webhook unavailable");
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
