import { Resend } from 'resend';

/**
 * POST /api/contact
 *
 * Vercel serverless function that sends the contact-form submission to
 * info@nursitree.com via Resend. The Resend API key lives only in the
 * server-side env var RESEND_API_KEY and is never shipped to the browser.
 *
 * Field names match exactly what the frontend (src/components/ContactSection.tsx)
 * sends: name, email, company, phone, projectType, message, timestamp.
 */

const TO_ADDRESS = 'info@nursitree.com';
const FROM_ADDRESS = 'NursiTree <noreply@nursitree.com>';
const SUBJECT = 'Nieuw contactformulier bericht';

// Friendly, non-technical message returned to the browser on any failure.
const GENERIC_ERROR =
  'Er is iets misgegaan bij het versturen van jouw bericht. Probeer het later opnieuw.';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Safe server-side log only; no detail leaks to the client.
    console.error('[contact] Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ error: GENERIC_ERROR });
  }

  // Vercel parses JSON bodies automatically, but guard against string bodies too.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const company = (body.company || '').toString().trim();
  const phone = (body.phone || '').toString().trim();
  const projectType = (body.projectType || '').toString().trim();
  const message = (body.message || '').toString().trim();
  const timestamp = (body.timestamp || '').toString().trim() || new Date().toISOString();

  // Validate required fields (mirrors the frontend validation).
  const missing = [];
  if (!name) missing.push('name');
  if (!email) missing.push('email');
  if (!company) missing.push('company');
  if (!message) missing.push('message');
  if (missing.length > 0) {
    console.warn('[contact] Missing required fields:', missing.join(', '));
    return res.status(400).json({ error: GENERIC_ERROR });
  }
  if (!email.includes('@') || !email.includes('.')) {
    console.warn('[contact] Invalid email address submitted');
    return res.status(400).json({ error: GENERIC_ERROR });
  }

  const projectTypeDisplay = projectType || '—';
  const phoneDisplay = phone || '—';

  const text = [
    'Nieuw contactformulier bericht',
    '',
    `Naam: ${name}`,
    `E-mail: ${email}`,
    `Bedrijf: ${company}`,
    `Telefoon: ${phoneDisplay}`,
    `Type project: ${projectTypeDisplay}`,
    '',
    'Bericht:',
    message,
    '',
    `Tijdstip: ${timestamp}`,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.5;">
      <h2 style="color: #6BA539; margin-bottom: 16px;">Nieuw contactformulier bericht</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 6px 12px; font-weight: bold;">Naam</td><td style="padding: 6px 12px;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 12px; font-weight: bold;">E-mail</td><td style="padding: 6px 12px;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 6px 12px; font-weight: bold;">Bedrijf</td><td style="padding: 6px 12px;">${escapeHtml(company)}</td></tr>
        <tr><td style="padding: 6px 12px; font-weight: bold;">Telefoon</td><td style="padding: 6px 12px;">${escapeHtml(phoneDisplay)}</td></tr>
        <tr><td style="padding: 6px 12px; font-weight: bold;">Type project</td><td style="padding: 6px 12px;">${escapeHtml(projectTypeDisplay)}</td></tr>
      </table>
      <h3 style="margin: 20px 0 8px;">Bericht</h3>
      <p style="white-space: pre-wrap; background: #f9fafb; padding: 12px; border-radius: 8px;">${escapeHtml(message)}</p>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Tijdstip: ${escapeHtml(timestamp)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: SUBJECT,
      text,
      html,
    });

    if (error) {
      // Logs the real Resend error (e.g. invalid from/reply-to, unverified
      // domain) server-side without exposing it to the user.
      console.error('[contact] Resend API error:', error);
      return res.status(502).json({ error: GENERIC_ERROR });
    }

    return res.status(200).json({ success: true, id: data?.id ?? null });
  } catch (err) {
    console.error('[contact] Unexpected error sending email:', err);
    return res.status(500).json({ error: GENERIC_ERROR });
  }
}
