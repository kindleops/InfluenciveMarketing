import { NextResponse } from "next/server";
import { brand } from "@/config/brand";
import { companySizes, needs, scopes, timelines, validIds } from "@/content/intake";

/**
 * Project inquiry endpoint.
 *
 * Delivery (configure at least one in production):
 *   INQUIRY_WEBHOOK_URL   POSTs the inquiry as JSON (Slack workflow, Zapier,
 *                         Make, a CRM webhook, …)
 *   RESEND_API_KEY +
 *   INQUIRY_TO_EMAIL      sends a formatted email through Resend
 *   INQUIRY_FROM_EMAIL    optional sender (defaults to onboarding@resend.dev)
 *
 * With nothing configured, development logs the inquiry and succeeds;
 * production returns 503 so the visitor is told to email instead — a lead is
 * never silently dropped.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const label = (list: readonly { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? id;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: pretend success, deliver nothing.
  if (str(body._hp, 200)) return NextResponse.json({ ok: true });

  const inquiry = {
    building: str(body.building, 600),
    needs: Array.isArray(body.needs) ? body.needs.filter((n): n is string => typeof n === "string" && validIds.needs.includes(n)) : [],
    size: str(body.size, 40),
    scope: str(body.scope, 40),
    timeline: str(body.timeline, 40),
    context: str(body.context, 4000),
    name: str(body.name, 200),
    email: str(body.email, 200),
    company: str(body.company, 200),
    role: str(body.role, 200),
    website: str(body.website, 200),
  };

  const errors: string[] = [];
  if (inquiry.building.length < 3) errors.push("building");
  if (!inquiry.needs.length) errors.push("needs");
  if (!validIds.size.includes(inquiry.size)) errors.push("size");
  if (!validIds.scope.includes(inquiry.scope)) errors.push("scope");
  if (!validIds.timeline.includes(inquiry.timeline)) errors.push("timeline");
  if (!inquiry.name) errors.push("name");
  if (!EMAIL.test(inquiry.email)) errors.push("email");
  if (!inquiry.company) errors.push("company");
  if (errors.length) return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });

  const readable = {
    ...inquiry,
    needs: inquiry.needs.map((n) => label(needs, n)),
    size: label(companySizes, inquiry.size),
    scope: label(scopes, inquiry.scope),
    timeline: label(timelines, inquiry.timeline),
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const deliveries: Promise<Response>[] = [];

  if (webhook) {
    deliveries.push(
      fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(readable) }),
    );
  }
  if (resendKey && to) {
    const lines = [
      `Building: ${readable.building}`,
      `Needs: ${readable.needs.join(", ")}`,
      `Company size: ${readable.size}`,
      `Scope: ${readable.scope}`,
      `Timeline: ${readable.timeline}`,
      "",
      `Context:\n${readable.context || "—"}`,
      "",
      `${readable.name} · ${readable.role || "—"} · ${readable.company}`,
      `${readable.email} · ${readable.website || "—"}`,
    ];
    deliveries.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.INQUIRY_FROM_EMAIL ?? `${brand.name} <onboarding@resend.dev>`,
          to: [to],
          reply_to: readable.email,
          subject: `New project inquiry — ${readable.company} (${readable.scope})`,
          text: lines.join("\n"),
        }),
      }),
    );
  }

  if (!deliveries.length) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[inquiry] (no delivery configured — development only)", readable);
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[inquiry] No delivery configured. Set INQUIRY_WEBHOOK_URL or RESEND_API_KEY + INQUIRY_TO_EMAIL.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const results = await Promise.allSettled(deliveries);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) {
    console.error("[inquiry] Delivery failed", results);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
