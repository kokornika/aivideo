interface PredictionResponse {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output: string | null;
  error?: string;
  urls: {
    get: string;
    cancel: string;
  };
}

interface VideoGenerationParams {
  prompt: string;
  seed?: number;
  width?: number;
  height?: number;
  flow_shift?: number;
  infer_steps?: number;
  video_length?: number;
  negative_prompt?: string;
  embedded_guidance_scale?: number;
}

const DEFAULT_PARAMS: Partial<VideoGenerationParams> = {
  width: 854,
  height: 480,
  flow_shift: 7,
  infer_steps: 50,
  video_length: 129,
  embedded_guidance_scale: 6
};

export async function generateVideoWithHunyuan(description: string): Promise<PredictionResponse> {
  const MAX_POLLING_ATTEMPTS = 60; // 1 minute with 1s intervals

  const params: VideoGenerationParams = {
    ...DEFAULT_PARAMS,
    prompt: description,
    negative_prompt: "blurry, low quality, distorted"
  };

  try {
    const response = await fetch('/api/replicate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: "847dfa8b01e739637fc76f480ede0c1d76408e1d694b830b5dfb8e547bf98405",
        input: params
      })
    });

    if (!response.ok) {
      let errorMessage = '';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.detail || '';
      } catch {
        errorMessage = `HTTP ${response.status}`;
      }

      // Részletesebb hibaüzenetek
      if (response.status === 429) {
        throw new Error('Túl sok kérés. Kérlek, várj egy kicsit és próbáld újra.');
      } else if (response.status === 401) {
        throw new Error('Érvénytelen API kulcs. Kérlek, ellenőrizd a beállításokat.');
      } else if (response.status === 403) {
        throw new Error('Nincs jogosultságod az API használatához.');
      } else if (response.status === 500) {
        throw new Error(`Szerveroldali hiba történt: ${errorMessage}`);
      }
      
      throw new Error(`API hiba: ${errorMessage}`);
    }

    const prediction: PredictionResponse = await response.json();
    console.log('API válasz:', prediction); // Debug információ
    
    let result = prediction;
    let attempts = 0;
    
    while (result.status !== 'succeeded' && result.status !== 'failed' && result.status !== 'canceled') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const pollUrl = `/api/replicate-status/${prediction.id}`;
      const pollResponse = await fetch(pollUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!pollResponse.ok) {
        if (pollResponse.status === 429) {
          throw new Error('Túl sok állapotellenőrzés. Kérlek, várj egy kicsit és próbáld újra.');
        }
        throw new Error('Hiba történt az állapot lekérdezése közben');
      }
      
      result = await pollResponse.json();
      attempts++;
    }

    return result;
  } catch (error) {
    console.error('Videó generálási hiba:', error instanceof Error ? error.message : 'Ismeretlen hiba');
    throw error;
  }
}