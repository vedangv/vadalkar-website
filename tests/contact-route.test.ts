import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/contact/route.ts";

const submission = {
  name: "Test Enquirer",
  email: "enquirer@example.com",
  message: "Please tell me more about your structural engineering services.",
};

function request(body: unknown = submission, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost:3100/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

function mockDelivery(t: TestContext, webhook?: typeof fetch) {
  const names = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL", "GOOGLE_SHEETS_WEBHOOK_URL"] as const;
  const original = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  Object.assign(process.env, {
    RESEND_API_KEY: "test-key-never-sent",
    CONTACT_FROM_EMAIL: "test@example.com",
    CONTACT_TO_EMAIL: "recipient@example.com",
    GOOGLE_SHEETS_WEBHOOK_URL: webhook ? "http://localhost:3100/mock-sheets" : "",
  });
  t.after(() => {
    for (const name of names) {
      if (original[name] === undefined) delete process.env[name];
      else process.env[name] = original[name];
    }
  });
  t.mock.method(console, "error", () => {});
  const deliveries: unknown[] = [];
  t.mock.method(globalThis, "fetch", async (input: Parameters<typeof fetch>[0], init?: RequestInit) => {
    if (String(input) === "https://api.resend.com/emails") {
      deliveries.push(JSON.parse(String(init?.body)));
      return Response.json({ id: "local-test-delivery" });
    }
    assert.equal(String(input), "http://localhost:3100/mock-sheets");
    assert.ok(webhook, "Unexpected external request");
    return webhook(input, init);
  });
  return deliveries;
}

test("contact route validates requests before delivery", async (t) => {
  const deliveries = mockDelivery(t);
  assert.equal((await POST(request(submission, { origin: "https://elsewhere.example" }))).status, 403);
  assert.equal((await POST(request(submission, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await POST(request({ ...submission, message: "short" }))).status, 400);
  assert.equal((await POST(request({ ...submission, website: "spam.example" }))).status, 200);
  assert.equal(deliveries.length, 0);
});

test("contact route sends a valid enquiry exactly once", async (t) => {
  const deliveries = mockDelivery(t);
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(deliveries.length, 1);
});

test("successful email stays successful when the optional lead log is unreachable", async (t) => {
  const deliveries = mockDelivery(t, async () => { throw new TypeError("Connection refused"); });
  const response = await POST(request());
  assert.equal(deliveries.length, 1);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
});

test("successful email stays successful when the optional lead log returns an error", async (t) => {
  mockDelivery(t, async () => new Response("Unavailable", { status: 503 }));
  assert.equal((await POST(request())).status, 200);
});

test("a stalled lead log is aborted without losing a successful enquiry", async (t) => {
  let aborted = false;
  mockDelivery(t, async (_input, init) => new Promise<Response>((_resolve, reject) => {
    const deadline = setTimeout(() => reject(new Error("Lead log was not aborted")), 4_000);
    init?.signal?.addEventListener("abort", () => {
      aborted = true;
      clearTimeout(deadline);
      reject(init.signal?.reason);
    }, { once: true });
  }));
  assert.equal((await POST(request())).status, 200);
  assert.equal(aborted, true);
});

test("a delivery error does not report success or attempt the optional lead log", async (t) => {
  mockDelivery(t);
  t.mock.method(globalThis, "fetch", async (input: Parameters<typeof fetch>[0]) => {
    assert.equal(String(input), "https://api.resend.com/emails");
    return Response.json({ name: "validation_error", message: "Test delivery rejected" }, { status: 422 });
  });
  const response = await POST(request());
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: "Failed to send message" });
});

test("malformed JSON and a missing delivery configuration fail safely", async (t) => {
  const deliveries = mockDelivery(t);
  const malformed = new NextRequest("http://localhost:3100/api/contact", {
    method: "POST", headers: { "content-type": "application/json" }, body: "{",
  });
  assert.equal((await POST(malformed)).status, 400);
  delete process.env.RESEND_API_KEY;
  assert.equal((await POST(request())).status, 503);
  assert.equal(deliveries.length, 0);
});

test("stream decoding preserves a multibyte character split between chunks", async (t) => {
  const deliveries = mockDelivery(t);
  const data = { ...submission, name: "जया Engineer" };
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  const split = bytes.findIndex((byte) => byte > 127) + 1;
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes.slice(0, split));
      controller.enqueue(bytes.slice(split));
      controller.close();
    },
  });
  const req = new NextRequest("http://localhost:3100/api/contact", {
    method: "POST", headers: { "content-type": "application/json" }, body,
    ...{ duplex: "half" },
  });
  assert.equal((await POST(req)).status, 200);
  assert.match((deliveries[0] as { subject: string }).subject, /जया Engineer/);
});

test("oversized streamed requests stop reading at the byte limit", async (t) => {
  const deliveries = mockDelivery(t);
  let reads = 0;
  let canceled = false;
  const body = new ReadableStream({
    pull(controller) {
      reads += 1;
      if (reads <= 3) controller.enqueue(new Uint8Array(20_001));
      else controller.close();
    },
    cancel() { canceled = true; },
  }, { highWaterMark: 0 });
  const req = new NextRequest("http://localhost:3100/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    // Node requires duplex for streaming request bodies.
    ...{ duplex: "half" },
  });
  assert.equal((await POST(req)).status, 413);
  assert.equal(reads, 1);
  assert.equal(canceled, true);
  assert.equal(deliveries.length, 0);
});
