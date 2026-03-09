"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
        const json = await res.json();
        throw new Error(json.error || "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 p-8 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-600 mb-6">
          Thank you for your enquiry. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-green-700 underline hover:text-green-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
          <input type="text" id="name" name="name" required className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
          <input type="email" id="email" name="email" required className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent" placeholder="you@example.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent" placeholder="+91 XXXXX XXXXX" />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Service Required</label>
          <select id="service" name="service" className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent">
            <option value="">Select a service</option>
            <option value="Structural Design">Structural Design</option>
            <option value="Structural Analysis">Structural Analysis</option>
            <option value="Structural Audit">Structural Audit</option>
            <option value="Repair Consulting">Repair Consulting</option>
            <option value="Proof Checking">Proof Checking</option>
            <option value="STAADPro Consulting">STAADPro Consulting</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Project Details *</label>
        <textarea id="message" name="message" required rows={5} className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent resize-none" placeholder="Tell us about your project or enquiry..." />
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group bg-primary-500 text-white px-10 py-4 font-semibold hover:bg-primary-600 transition-all inline-flex items-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
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
            Send Message
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
