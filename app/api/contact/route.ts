const inbox = "muhamadrusdiana452@gmail.com";

type ContactPayload = {
  to?: unknown;
  fromName?: unknown;
  fromEmail?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Invalid request." }, { status: 415 });
  }

  let payload: ContactPayload;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return Response.json({ error: "Message is too long." }, { status: 413 });
    payload = JSON.parse(raw) as ContactPayload;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid payload");
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (payload.company) return Response.json({ ok: true });

  const name = typeof payload.fromName === "string" ? payload.fromName.trim() : "";
  const email = typeof payload.fromEmail === "string" ? payload.fromEmail.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const validEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email);

  if (payload.to !== inbox || !name || name.length > 100 || !validEmail || email.length > 254 || !subject || subject.length > 160 || !message || message.length > 5000) {
    return Response.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !sender) {
    return Response.json({ error: "The contact form is being set up. Please email me directly for now." }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [inbox],
        reply_to: email,
        subject: `[Portfolio] ${subject.replace(/[\r\n]+/g, " ")}`,
        text: `From: ${name.replace(/[\r\n]+/g, " ")} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Resend contact request failed", response.status, await response.text());
      return Response.json({ error: "Message could not be sent. Please try again later or email me directly." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed", error);
    return Response.json({ error: "Message could not be sent. Please try again later or email me directly." }, { status: 502 });
  }
}
