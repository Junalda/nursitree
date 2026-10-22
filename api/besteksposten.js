import { Resend } from 'resend';

/**
 * POST /api/besteksposten
 *
 * Lead-capture download: a visitor submits name + email, and the NursiTree
 * besteksposten (PDF + RAW/RSX) are automatically e-mailed to them via Resend.
 * A short notification of the lead is also sent to info@nursitree.com.
 *
 * The Resend API key lives only in the server-side env var RESEND_API_KEY and
 * is never shipped to the browser. Mirrors api/contact.js for a consistent,
 * proven setup (same verified sender domain).
 */

const INTERNAL_TO = 'info@nursitree.com';
const FROM_ADDRESS = 'NursiTree <noreply@nursitree.com>';

const FILES = [
  { path: '/downloads/besteksposten-nursitree-urban-tree-pit.pdf', filename: 'Besteksposten-NursiTree-Urban-Tree-Pit.pdf' },
  { path: '/downloads/besteksposten-nursitree-urban-tree-pit.rsx', filename: 'Besteksposten-NursiTree-Urban-Tree-Pit.rsx' },
];

const GENERIC_ERROR =
  'Er is iets misgegaan bij het versturen van de besteksposten. Probeer het later opnieuw.';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Fetch the static files from this same deployment so we can attach them.
async function loadAttachments(origin) {
  const attachments = [];
  for (const f of FILES) {
    try {
      const resp = await fetch(`${origin}${f.path}`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${f.path}`);
      const buf = Buffer.from(await resp.arrayBuffer());
      attachments.push({ filename: f.filename, content: buf.toString('base64') });
    } catch (err) {
      console.error('[besteksposten] Could not load attachment', f.path, err);
      return null; // fall back to download links if any file fails
    }
  }
  return attachments;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[besteksposten] Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ error: GENERIC_ERROR });
  }

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
  const timestamp = (body.timestamp || '').toString().trim() || new Date().toISOString();

  if (!name || !email) {
    return res.status(400).json({ error: GENERIC_ERROR });
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: GENERIC_ERROR });
  }

  // Derive this deployment's origin to fetch the files for attachment.
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString().split(',')[0];
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString();
  const origin = host ? `${proto}://${host}` : 'https://www.nursitree.com';

  const attachments = await loadAttachments(origin);
  const pdfUrl = `https://www.nursitree.com${FILES[0].path}`;
  const rsxUrl = `https://www.nursitree.com${FILES[1].path}`;

  const leadHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.6;">
      <h2 style="color: #6BA539; margin-bottom: 12px;">De besteksposten van NursiTree</h2>
      <p>Beste ${escapeHtml(name)},</p>
      <p>Bedankt voor je interesse. Hierbij ontvang je de besteksposten voor het leveren en
      aanbrengen van de Urban Tree Pit${attachments ? ' (zie de bijlagen: PDF en RAW/RSX)' : ''}.</p>
      ${
        attachments
          ? ''
          : `<p>Je kunt de documenten hier downloaden:</p>
             <ul>
               <li><a href="${pdfUrl}">Besteksposten (PDF)</a></li>
               <li><a href="${rsxUrl}">RAW-bestek (RSX)</a></li>
             </ul>`
      }
      <p>Vragen of een specifieke situatie? We denken graag met je mee —
      <a href="https://www.nursitree.com/#contact-section">neem gerust contact op</a>.</p>
      <p style="margin-top: 20px;">Met vriendelijke groet,<br/>Team NursiTree</p>
    </div>
  `;
  const leadText =
    `Beste ${name},\n\nBedankt voor je interesse. ` +
    `${attachments ? 'In de bijlagen vind je de besteksposten (PDF en RAW/RSX).' : `Download de besteksposten hier:\nPDF: ${pdfUrl}\nRSX: ${rsxUrl}`}` +
    `\n\nMet vriendelijke groet,\nTeam NursiTree`;

  const internalHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.5;">
      <h2 style="color: #6BA539; margin-bottom: 12px;">Nieuwe besteksposten-download</h2>
      <table style="border-collapse: collapse;">
        <tr><td style="padding: 6px 12px; font-weight: bold;">Naam</td><td style="padding: 6px 12px;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 12px; font-weight: bold;">E-mail</td><td style="padding: 6px 12px;">${escapeHtml(email)}</td></tr>
      </table>
      <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">Tijdstip: ${escapeHtml(timestamp)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    // 1) E-mail with the besteksposten to the visitor.
    const { error: leadError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: 'Je besteksposten van NursiTree',
      text: leadText,
      html: leadHtml,
      ...(attachments ? { attachments } : {}),
    });
    if (leadError) {
      console.error('[besteksposten] Resend lead email error:', leadError);
      return res.status(502).json({ error: GENERIC_ERROR });
    }

    // 2) Internal lead notification (best-effort; does not block the visitor).
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [INTERNAL_TO],
        replyTo: email,
        subject: 'Nieuwe besteksposten-download',
        html: internalHtml,
      });
    } catch (notifyErr) {
      console.error('[besteksposten] Internal notification failed:', notifyErr);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[besteksposten] Unexpected error:', err);
    return res.status(500).json({ error: GENERIC_ERROR });
  }
}
