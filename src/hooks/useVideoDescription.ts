import { useState, useCallback } from 'react';
import { generateStoryboard } from '../utils/videoUtils';

export function useVideoDescription() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedHardware, setSelectedHardware] = useState('gpu-h100');

  const generateVideo = useCallback(async () => {
    if (!description.trim() || isGenerating) return;

    try {
      setIsGenerating(true);
      await generateStoryboard(description, selectedHardware);
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [description, isGenerating, selectedHardware]);

  return {
    description,
    setDescription,
    generateVideo,
    isGenerating,
    selectedHardware,
    setSelectedHardware
  };
}