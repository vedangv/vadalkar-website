import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = { _type?: string };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 503 },
    );
  }

  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
      request,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ error: "Missing document type" }, { status: 400 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (error) {
    console.error("Sanity revalidation error:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
