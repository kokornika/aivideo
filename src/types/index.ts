export type AspectRatio = '16:9' | '9:16' | '1:1';
export type Quality = 'low' | 'medium' | 'high';

export interface VideoGenerationParams {
  prompt?: string;
  hardware_config: 'gpu-h100' | 'gpu-h100-2x' | 'gpu-h100-4x' | 'gpu-h100-8x';
  seed?: number;
  width?: number;
  height?: number;
  flow_shift?: number;
  infer_steps?: number;
  video_length?: number;
  negative_prompt?: string;
  embedded_guidance_scale?: number;
}