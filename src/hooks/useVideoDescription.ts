import { useState } from 'react';
import { generateStoryboard } from '../utils/videoUtils';

export function useVideoDescription() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVideo = async () => {
    if (!description.trim() || isGenerating) return;

    try {
      setIsGenerating(true);
      await generateStoryboard(description);
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    description,
    setDescription,
    generateVideo,
    isGenerating
  };
}