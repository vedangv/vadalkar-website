"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT_SERVICES } from "@/lib/contact";
import { SITE_EMAIL } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
const DELIVERY_ERROR = "We couldn’t send your message. Please try again or email us directly.";

type ContactFormProps = {
  initialService?: string;
  source?: "Contact page" | "Careers page";
  showService?: boolean;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
};

export default function ContactForm({
  initialService = "",
  source = "Contact page",
  showService = true,
  messageLabel = "Project Details",
  messagePlaceholder = "Tell us about your project or enquiry...",
  submitLabel = "Send Message",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const previousStatus = useRef(status);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    else if (status === "error") errorRef.current?.focus();
    else if (status === "idle" && previousStatus.current === "success") nameRef.current?.focus();
    previousStatus.current = status;
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setStatus("error");
        setErrorMsg(typeof json?.error === "string" ? json.error : DELIVERY_ERROR);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(DELIVERY_ERROR);
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} role="status" tabIndex={-1} className="border border-green-800 bg-green-900/20 p-8 text-center">
        <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-semibold text-green-300 mb-2">Message Sent!</h3>
        <p className="text-green-400 mb-6">
          Thank you for your enquiry. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-green-400 underline hover:text-green-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
      <noscript>
        <style>{".contact-form { display: none; }"}</style>
        <p className="border border-slate-700 bg-slate-800 p-6 text-slate-300">
          Email your enquiry to{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="font-semibold text-accent-400 underline">{SITE_EMAIL}</a>.
        </p>
      </noscript>
      <form method="post" action="/api/contact" onSubmit={handleSubmit} aria-busy={status === "submitting"} className="contact-form space-y-6">
        <fieldset disabled={status === "submitting"} className="space-y-6 disabled:opacity-70">
          <input type="hidden" name="source" value={source} />
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
              <input ref={nameRef} type="text" id="name" name="name" required minLength={2} maxLength={100} autoComplete="name" className="w-full px-0 py-3 border-0 border-b-2 border-slate-700 focus:border-accent-400 text-white placeholder:text-slate-400 outline-none transition-colors text-base bg-transparent" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
              <input type="email" id="email" name="email" required maxLength={254} autoComplete="email" className="w-full px-0 py-3 border-0 border-b-2 border-slate-700 focus:border-accent-400 text-white placeholder:text-slate-400 outline-none transition-colors text-base bg-transparent" placeholder="you@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
              <input type="tel" id="phone" name="phone" maxLength={40} autoComplete="tel" className="w-full px-0 py-3 border-0 border-b-2 border-slate-700 focus:border-accent-400 text-white placeholder:text-slate-400 outline-none transition-colors text-base bg-transparent" placeholder="+91 XXXXX XXXXX" />
            </div>
            {showService && (
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2">Service Required</label>
                <select id="service" name="service" defaultValue={initialService} className="w-full px-0 py-3 border-0 border-b-2 border-slate-700 focus:border-accent-400 text-white placeholder:text-slate-400 outline-none transition-colors text-base bg-transparent">
                  <option value="" className="bg-slate-900">Select a service</option>
                  {CONTACT_SERVICES.map((service) => (
                    <option key={service} value={service} className="bg-slate-900">{service}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">{messageLabel} *</label>
            <textarea id="message" name="message" aria-describedby="message-hint" required minLength={20} maxLength={5000} rows={5} className="w-full px-0 py-3 border-0 border-b-2 border-slate-700 focus:border-accent-400 text-white placeholder:text-slate-400 outline-none transition-colors text-base bg-transparent resize-y" placeholder={messagePlaceholder} />
            <p id="message-hint" className="mt-2 text-sm text-slate-400">Please include at least 20 characters.</p>
          </div>
        </fieldset>

        {status === "error" && (
          <div ref={errorRef} role="alert" tabIndex={-1} className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 text-sm">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group bg-accent-400 text-slate-900 px-10 py-4 font-semibold hover:bg-accent-300 transition-all inline-flex items-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              Sending...
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </>
          ) : (
            <>
              {submitLabel}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>
    </>
  );
}
