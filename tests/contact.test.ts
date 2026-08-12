import assert from "node:assert/strict";
import test from "node:test";
import {
  contactEmailHtml,
  escapeHtml,
  isAllowedRequestOrigin,
  validateContactSubmission,
} from "../src/lib/contact.ts";

const validSubmission = {
  name: "Asha Engineer",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  service: "Structural Audit",
  message: "Please review an existing residential structure in Mumbai.",
  website: "",
};

test("accepts and normalizes a valid contact submission", () => {
  const result = validateContactSubmission({
    ...validSubmission,
    email: " ASHA@EXAMPLE.COM ",
  });

  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.email, "asha@example.com");
});

test("rejects invalid fields and unknown services", () => {
  assert.equal(validateContactSubmission({ ...validSubmission, name: "A" }).success, false);
  assert.equal(validateContactSubmission({ ...validSubmission, name: "Header\nInjection" }).success, false);
  assert.equal(validateContactSubmission({ ...validSubmission, email: "no-at-sign" }).success, false);
  assert.equal(validateContactSubmission({ ...validSubmission, service: "Unlisted service" }).success, false);
  assert.equal(validateContactSubmission({ ...validSubmission, message: "Too short" }).success, false);
});

test("accepts same-origin and origin-less requests but rejects mismatched origins", () => {
  assert.equal(isAllowedRequestOrigin("https://vadalkar.com", "https://vadalkar.com"), true);
  assert.equal(isAllowedRequestOrigin(null, "https://vadalkar.com"), true);
  assert.equal(isAllowedRequestOrigin("https://example.com", "https://vadalkar.com"), false);
});

test("escapes user-controlled HTML in the generated email", () => {
  const submission = {
    ...validSubmission,
    name: '<img src=x onerror="alert(1)">',
    message: "First line\n<script>alert('x')</script>",
  };
  const result = validateContactSubmission(submission);
  assert.equal(result.success, true);
  if (!result.success) return;

  const html = contactEmailHtml(result.data);
  assert.doesNotMatch(html, /<script|<img/i);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /<br \/>/);
  assert.equal(escapeHtml(`&<>"'`), "&amp;&lt;&gt;&quot;&#039;");
});
