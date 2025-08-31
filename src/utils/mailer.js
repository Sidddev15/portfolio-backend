import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let transporter = null;
let mailEnabled = false;

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } =
  process.env;

if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && MAIL_FROM && MAIL_TO) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for others
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  mailEnabled = true;
  console.log("✉️  Mailer configured (contact notifications enabled)");
} else {
  console.log(
    "✉️  Mailer not configured (skipping contact email notifications)"
  );
}

console.log("Loaded SMTP env:", {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_TO: process.env.MAIL_TO,
});

if (transporter) {
  transporter.verify((err, success) => {
    if (err) {
      console.error("❌ SMTP connection failed:", err.message);
    } else {
      console.log("✅ SMTP server is ready to send emails");
    }
  });
}

export async function sendContactEmailIfConfigured(payload) {
  if (!mailEnabled) return;

  const { name, email, subject, message, page, id } = payload;

  const html = `
    <h2>New contact message</h2>
    <p><b>Name:</b> ${escapeHtml(name)}</p>
    <p><b>Email:</b> ${escapeHtml(email)}</p>
    <p><b>Subject:</b> ${escapeHtml(subject)}</p>
    <p><b>Message:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    <hr/>
    <p><b>From page:</b> ${escapeHtml(page || "")}</p>
    <p><b>Message ID:</b> ${escapeHtml(id)}</p>
  `;

  await transporter.sendMail({
    from: MAIL_FROM, // your identity (must match Gmail user)
    to: MAIL_TO, // your inbox
    replyTo: email, // <-- add this!
    subject: `Portfolio contact: ${subject} — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n\nPage: ${page}\nID: ${id}`,
    html,
  });
}

// Simple HTML escape to avoid HTML injection in emails
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
