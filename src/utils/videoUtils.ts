import { toast } from '../components/Toast';
import { generateVideoWithHunyuan } from '../services/hunyuanApi';
import { addVideoToLibrary } from '../hooks/useVideoLibrary';
import { VideoGenerationParams } from '../types';

export async function generateStoryboard(
  description: string,
  params: Partial<VideoGenerationParams>
): Promise<void> {
  try {
    if (!description.trim()) {
      toast.error('Kérlek, add meg a videó leírását');
      return;
    }

    // Ellenőrizzük, hogy a video_length-1 4 többszöröse-e
    if (params.video_length) {
      const targetLength = params.video_length - 1;
      if (targetLength % 4 !== 0) {
        params.video_length = Math.floor(targetLength / 4) * 4 + 1;
      }
    }
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