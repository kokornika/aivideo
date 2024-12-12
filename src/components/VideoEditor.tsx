import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { useVideoDescription } from '../hooks/useVideoDescription';
import { AspectRatio, Quality } from '../types';

export function VideoEditor() {
  const { 
    description, 
    setDescription, 
    generateVideo, 
    isGenerating,
    videoParams,
    setVideoParams 
  } = useVideoDescription();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('16:9');
  const [selectedQuality, setSelectedQuality] = useState<Quality>('medium');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleParamChange = (param: string, value: string | number) => {
    if (param === 'video_length') {
      // A video_length-1 értéknek kell 4 többszörösének lennie
      const adjustedLength = Math.floor((Number(value) - 1) / 4) * 4 + 1;
      value = Math.max(5, Math.min(adjustedLength, 129)); // Minimum 5 (4+1), maximum 129 (128+1)
    }

    setVideoParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleAspectRatioChange = (width: number, height: number, ratio: AspectRatio) => {
    setSelectedAspectRatio(ratio);
    setVideoParams(prev => ({
      ...prev,
      width,
      height
    }));
  };

  const handleQualityChange = (quality: 'low' | 'medium' | 'high') => {
    setSelectedQuality(quality);
    const qualitySettings = {
      low: { width: 480, height: 270, infer_steps: 30, video_length: 65 },  // 64+1
      medium: { width: 854, height: 480, infer_steps: 50, video_length: 65 },  // 64+1
      high: { width: 1280, height: 720, infer_steps: 70, video_length: 65 }  // 64+1
    };
    
    setVideoParams(prev => ({
      ...prev,
      ...qualitySettings[quality],
      video_length: 64  // Alapértelmezett hossz, ami 4 többszöröse
    }));
  };

  return (
    <div className="fixed bottom-0 left-64 right-0 bg-[#121212] border-t border-white/10 p-4">
      {isGenerating && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-white">Videó generálása...</span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateVideo()}
            placeholder="Írd le a videód..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 px-2 py-1 bg-white/5 rounded-lg">
            <button
              onClick={() => handleAspectRatioChange(854, 480, '16:9')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedAspectRatio === '16:9' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              16:9
            </button>
            <button
              onClick={() => handleAspectRatioChange(480, 854, '9:16')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedAspectRatio === '9:16' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              9:16
            </button>
            <button
              onClick={() => handleAspectRatioChange(640, 640, '1:1')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedAspectRatio === '1:1' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              1:1
            </button>
          </div>
          <div className="flex gap-2 px-2 py-1 bg-white/5 rounded-lg">
            <button
              onClick={() => handleQualityChange('low')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedQuality === 'low' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              Gyors
            </button>
            <button
              onClick={() => handleQualityChange('medium')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedQuality === 'medium' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              Normál
            </button>
            <button
              onClick={() => handleQualityChange('high')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedQuality === 'high' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              HD
            </button>
          </div>
          <ToolButton 
            icon={Settings2} 
            onClick={() => setShowAdvanced(!showAdvanced)}
            tooltip="Haladó beállítások"
            active={showAdvanced}
          />
          <button 
            onClick={generateVideo}
            disabled={!description.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Forgatókönyv
          </button>
        </div>
      </div>
      {showAdvanced && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Szélesség (px)</label>
            <input
              type="number"
              value={videoParams.width}
              onChange={(e) => handleParamChange('width', parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Magasság (px)</label>
            <input
              type="number"
              value={videoParams.height}
              onChange={(e) => handleParamChange('height', parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Videó hossza (képkocka)</label>
            <input
              type="number"
              value={videoParams.video_length}
              onChange={(e) => handleParamChange('video_length', parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white"
              min="4"
              step="4"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Következtetési lépések</label>
            <input
              type="number"
              value={videoParams.infer_steps}
              onChange={(e) => handleParamChange('infer_steps', parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Seed érték</label>
            <input
              type="number"
              value={videoParams.seed}
              onChange={(e) => handleParamChange('seed', parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm text-gray-400 mb-1">Negatív prompt</label>
            <input
              type="text"
              value={videoParams.negative_prompt}
              onChange={(e) => handleParamChange('negative_prompt', e.target.value)}
              placeholder="Amit nem szeretnél látni a videóban..."
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface ToolButtonProps {
  icon: any;
  label?: string;
  tooltip?: string;
  onClick?: () => void;
  active?: boolean;
}

function ToolButton({ icon: Icon, label, tooltip, onClick, active }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 relative group ${active ? 'bg-blue-500/20 text-blue-400' : ''}`}
    >
      <Icon className="w-5 h-5" />
      {label && <span>{label}</span>}
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </button>
  );
}