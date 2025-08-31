import { z } from "zod";
import Message from "../models/Message.js";
import { sendContactEmailIfConfigured } from "../utils/mailer.js";

// Basic server-side validation
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  // optional fields you may pass from FE
  page: z.string().optional(), // where the user sent from
  hp: z.string().optional(), // honeypot anti-bot field (leave empty on FE)
});

export async function postContact(req, res) {
  // Honeypot: if present & non-empty we silently accept but do nothing
  if (req.body?.hp && String(req.body.hp).trim().length > 0) {
    return res.status(204).end(); // no content to confuse bots
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { name, email, subject, message, page } = parsed.data;

  const doc = await Message.create({
    name,
    email,
    subject,
    message,
    // optional metadata
    // eslint-disable-next-line no-underscore-dangle
    createdAt: new Date(),
    read: false,
    archived: false,
    // You could add ip/user-agent if desired
  });

  // Fire-and-forget email if SMTP configured
  sendContactEmailIfConfigured({
    name,
    email,
    subject,
    message,
    page: page || req.headers.referer || "",
    id: doc._id.toString(),
  }).catch(() => {
    /* ignore mail errors */
  });

  res.status(201).json({ ok: true, id: doc._id });
}
