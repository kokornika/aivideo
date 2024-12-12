import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  
  if (!REPLICATE_API_TOKEN) {
    console.error('REPLICATE_API_TOKEN nincs beállítva');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'API kulcs nincs beállítva',
        details: 'Kérlek, ellenőrizd a Netlify környezeti változókat'
      }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Hiányzó request body',
          details: 'A kérés nem tartalmaz adatokat'
        }),
      };
    }

    const requestData = JSON.parse(event.body);
    
    if (!requestData.version || !requestData.input) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Érvénytelen kérés formátum',
          details: 'A version és input mezők kötelezőek'
        }),
      };
    }

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Replicate API hiba:', data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: 'Replicate API hiba',
          details: data.error || 'Ismeretlen hiba történt'
        }),
      };
    }

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Szerver hiba:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Szerver hiba történt',
        details: error instanceof Error ? error.message : 'Ismeretlen hiba'
      }),
    };
  }
  }

export { handler };