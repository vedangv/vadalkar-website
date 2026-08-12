export const CONTACT_SERVICES = [
  "Structural Design",
  "Structural Analysis",
  "Structural Audit",
  "Repair Consulting",
  "Proof Checking",
  "STAADPro Consulting",
  "Other",
] as const;

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
  source: "Contact page" | "Careers page";
};

type ContactValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isAllowedRequestOrigin(
  origin: string | null,
  requestOrigin: string,
): boolean {
  return !origin || origin === requestOrigin;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(value: unknown): ContactValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false, error: "Invalid request" };
  }

  const body = value as Record<string, unknown>;
  const data: ContactSubmission = {
    name: readString(body.name),
    email: readString(body.email).toLowerCase(),
    phone: readString(body.phone),
    service: readString(body.service),
    message: readString(body.message),
    website: readString(body.website),
    source: body.source === "Careers page" ? "Careers page" : "Contact page",
  };

  if (data.name.length < 2 || data.name.length > 100) {
    return { success: false, error: "Enter a valid name" };
  }
  if (/[\r\n]/.test(data.name)) {
    return { success: false, error: "Enter a valid name" };
  }
  if (data.email.length > 254 || !EMAIL_PATTERN.test(data.email)) {
    return { success: false, error: "Enter a valid email address" };
  }
  if (data.phone.length > 40) {
    return { success: false, error: "Phone number is too long" };
  }
  if (data.service && !CONTACT_SERVICES.includes(data.service as (typeof CONTACT_SERVICES)[number])) {
    return { success: false, error: "Select a valid service" };
  }
  if (data.message.length < 20 || data.message.length > 5_000) {
    return { success: false, error: "Message must be between 20 and 5,000 characters" };
  }

  return { success: true, data };
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

export function contactEmailHtml(data: ContactSubmission): string {
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone || "Not provided"),
    service: escapeHtml(data.service || "Not specified"),
    message: escapeHtml(data.message).replace(/\r?\n/g, "<br />"),
    source: escapeHtml(data.source),
  };

  return `
    <h2>New Website Enquiry</h2>
    <p><strong>Name:</strong> ${safe.name}</p>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Phone:</strong> ${safe.phone}</p>
    <p><strong>Service:</strong> ${safe.service}</p>
    <p><strong>Source:</strong> ${safe.source}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${safe.message}</p>
  `;
}
