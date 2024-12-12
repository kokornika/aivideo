import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  const predictionId = event.path.split('/').pop();

  if (!REPLICATE_API_TOKEN || !predictionId) {
    console.error('Hiányzó paraméterek:', { predictionId });
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Hiányzó paraméterek' }),
    };
  }

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Szerver hiba történt' }),
    };
  }
}

export { handler };