const RESEND_API_URL = 'https://api.resend.com/emails';
const RECIPIENT = process.env.CONTACT_TO_EMAIL || 'waelsouabni@gmail.com';
const FROM = process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

function json(res, status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function clean(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength);
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json(null, 405, { success: false, message: 'Méthode non autorisée.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing.');
    return json(null, 500, { success: false, message: 'Service email non configuré.' });
  }

  try {
    const data = await request.json();

    // Honeypot: bots should never fill this field.
    if (clean(data._honey, 200)) {
      return json(null, 200, { success: true });
    }

    const name = clean(data.name, 100);
    const email = clean(data.email, 200);
    const subject = clean(data.subject, 160) || 'Nouveau message depuis le portfolio';
    const message = clean(data.message, 5000);

    if (!name || !email || !message) {
      return json(null, 400, {
        success: false,
        message: 'Veuillez remplir les champs obligatoires.',
      });
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailIsValid) {
      return json(null, 400, {
        success: false,
        message: 'Adresse e-mail invalide.',
      });
    }

    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
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

    const result = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error('Resend API error:', result);
      return json(null, 502, {
        success: false,
        message: 'Le service email a refusé l’envoi.',
      });
    }

    return json(null, 200, {
      success: true,
      message: 'Message envoyé.',
      id: result.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    const isTimeout = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    return json(null, isTimeout ? 504 : 500, {
      success: false,
      message: isTimeout ? 'Le service email met trop de temps à répondre. Réessayez dans quelques instants.' : 'Une erreur est survenue pendant l’envoi.',
    });
  }
}
