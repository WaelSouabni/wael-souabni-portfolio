const RESEND_API_URL = 'https://api.resend.com/emails';
const RECIPIENT = process.env.CONTACT_TO_EMAIL || 'waelsouabni@gmail.com';
const FROM = process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

function json(res, status, body) {
  return res.status(status).json(body);
}

function clean(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, {
      success: false,
      message: 'Méthode non autorisée.',
    });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing.');
    return json(res, 500, {
      success: false,
      message: 'Service email non configuré.',
    });
  }

  try {
    const data =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body || {};

    if (clean(data._honey, 200)) {
      return json(res, 200, { success: true });
    }

    const name = clean(data.name, 100);
    const email = clean(data.email, 200);
    const subject =
      clean(data.subject, 160) ||
      'Nouveau message depuis le portfolio';
    const message = clean(data.message, 5000);

    if (!name || !email || !message) {
      return json(res, 400, {
        success: false,
        message: 'Veuillez remplir les champs obligatoires.',
      });
    }

    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return json(res, 400, {
        success: false,
        message: 'Adresse e-mail invalide.',
      });
    }

    console.log('Sending portfolio contact email...', {
      name,
      email,
      subject,
      recipient: RECIPIENT,
    });

    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [RECIPIENT],
        reply_to: email,
        subject: `Portfolio — ${subject}`,
        text: [
          `Nom : ${name}`,
          `E-mail : ${email}`,
          `Sujet : ${subject}`,
          '',
          message,
        ].join('\n'),
      }),
    });

    const result =
      await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error('Resend API error:', result);
      return json(res, 502, {
        success: false,
        message: 'Le service email a refusé l’envoi.',
      });
    }

    console.log('Portfolio contact email sent:', result.id);

    return json(res, 200, {
      success: true,
      message: 'Message envoyé.',
      id: result.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return json(res, 500, {
      success: false,
      message: 'Une erreur est survenue pendant l’envoi.',
    });
  }
}
