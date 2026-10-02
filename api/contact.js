export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, website } = req.body || {};

    // Honeypot: silently accept obvious bot submissions.
    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({ error: 'Veuillez remplir les champs obligatoires.' });
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000 || (subject || '').length > 160) {
      return res.status(400).json({ error: 'Le message est trop long.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Le service e-mail n’est pas encore configuré.' });
    }

    const safe = (value) =>
      String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const senderName = name.trim();
    const senderEmail = email.trim();
    const mailSubject = (subject || 'Nouveau message depuis le portfolio').trim();
    const mailMessage = message.trim();

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // Replace with a verified domain sender when one is configured in Resend.
        from: 'Portfolio Wael <onboarding@resend.dev>',
        to: ['waelsouabni@gmail.com'],
        reply_to: senderEmail,
        subject: `Portfolio — ${mailSubject}`,
        html: `
          <h2>Nouveau message depuis le portfolio</h2>
          <p><strong>Nom :</strong> ${safe(senderName)}</p>
          <p><strong>E-mail :</strong> ${safe(senderEmail)}</p>
          <p><strong>Sujet :</strong> ${safe(mailSubject)}</p>
          <hr />
          <p style="white-space:pre-wrap">${safe(mailMessage)}</p>
        `,
      }),
    });

    const data = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error('Resend error:', data);
      return res.status(502).json({ error: 'L’envoi de l’e-mail a échoué.' });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Une erreur interne est survenue.' });
  }
}
