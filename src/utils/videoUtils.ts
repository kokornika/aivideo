import { toast } from '../components/Toast';
import { generateVideoWithHunyuan } from '../services/hunyuanApi';
import { addVideoToLibrary } from '../hooks/useVideoLibrary';
import { VideoGenerationParams } from '../types';

export async function generateStoryboard(
  description: string,
  hardware: string
): Promise<void> {
  try {
    if (!description.trim()) {
      toast.error('Kérlek, add meg a videó leírását');
      return;
    }

    // Alapértelmezett paraméterek
    const params: VideoGenerationParams = {
      hardware_config: hardware as 'gpu-h100' | 'gpu-h100-2x' | 'gpu-h100-4x' | 'gpu-h100-8x',
      width: 854,
      height: 480,
      video_length: 64, // 4 többszöröse
      infer_steps: 50,
      seed: Math.floor(Math.random() * 1000000),
      negative_prompt: '',
      flow_shift: 5,
      embedded_guidance_scale: 6
    };
    toast.info('Videó generálása folyamatban... (Ez eltarthat néhány percig)');
    
    const result = await generateVideoWithHunyuan(description, params);
    
    if (result.status === 'succeeded') {
      if (result.output) {
        toast.success('A videó sikeresen elkészült!');
        addVideoToLibrary({
          title: description.slice(0, 50) + (description.length > 50 ? '...' : ''),
          thumbnail: result.output,
          createdAt: new Date().toISOString(),
          url: result.output
        });
      } else {
        toast.error('A videó generálása sikeres, de nem kaptunk vissza URL-t');
      }
    } else if (result.status === 'failed') {
      toast.error(result.error || 'Hiba történt a videó generálása közben');
    } else if (result.status === 'canceled') {
      toast.info('A videó generálása megszakítva');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ismeretlen hiba történt';
    if (errorMessage.includes('API kulcs')) {
      toast.error('API kulcs hiba. Kérlek, ellenőrizd a beállításokat.');
    } else if (errorMessage.includes('Szerveroldali hiba')) {
      toast.error('A szerver átmenetileg nem elérhető. Kérlek, próbáld újra később.');
    } else {
      console.error('Videó generálási hiba:', errorMessage);
      toast.error('Hiba történt a videó generálása közben. Kérlek, próbáld újra.');
    }
  }
}