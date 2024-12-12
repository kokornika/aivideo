import { useState, useCallback } from 'react';
import { generateStoryboard } from '../utils/videoUtils';
import { VideoGenerationParams } from '../types';

export function useVideoDescription() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedHardware, setSelectedHardware] = useState('gpu-h100');
  const [videoParams, setVideoParams] = useState<Partial<VideoGenerationParams>>({
    width: 854,
    height: 480,
    video_length: 69,  // video_length-1 legyen 4 többszöröse (68)
    infer_steps: 50,
    seed: Math.floor(Math.random() * 1000000),
    negative_prompt: ''
  });

  const generateVideo = useCallback(async () => {
    if (!description.trim() || isGenerating) return;

    try {
      setIsGenerating(true);
      await generateStoryboard(description, {
        hardware_config: selectedHardware as VideoGenerationParams['hardware_config'],
        ...videoParams
      });
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [description, isGenerating, selectedHardware, videoParams]);

  return {
    description,
    setDescription,
    generateVideo,
    isGenerating,
    selectedHardware,
    setSelectedHardware,
    videoParams,
    setVideoParams
  };
}