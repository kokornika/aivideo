import { toast } from '../components/Toast';
import { generateVideoWithHunyuan } from '../services/hunyuanApi';

export async function generateStoryboard(description: string): Promise<void> {
  try {
    if (!description.trim()) {
      toast.error('Kérlek, add meg a videó leírását');
      return;
    }

    toast.info('Videó generálása folyamatban... (Ez eltarthat néhány percig)');
    
    const result = await generateVideoWithHunyuan(description);
    
    if (result.status === 'succeeded') {
      if (result.output) {
        toast.success('A videó sikeresen elkészült!');
        console.log('Generált videó URL:', result.output);
        // Itt kezelhetnénk a generált videót, pl. megjelenítés vagy letöltés
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