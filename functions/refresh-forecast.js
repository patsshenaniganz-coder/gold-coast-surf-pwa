
export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const webhookUrl = Netlify.env.get('MAKE_WEBHOOK_URL');

  if (!webhookUrl) {
    return new Response('Webhook not configured', { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'refresh_surf_forecast'
      })
    });

    if (!response.ok) {
      throw new Error('Make.com rejected the request');
    }

    return Response.json({
      success: true,
      message: 'Forecast update requested'
    });

  } catch (error) {
    console.error('Forecast trigger failed:', error);

    return Response.json(
      { success: false, error: 'Unable to request update' },
      { status: 502 }
    );
  }
}

export const config = {
  path: '/.netlify/functions/refresh-forecast'
};
