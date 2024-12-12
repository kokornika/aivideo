import React, { useState } from 'react';
import { Plus, Video, Clock, Image, Type, Cpu } from 'lucide-react';
import { useVideoDescription } from '../hooks/useVideoDescription';

const HARDWARE_OPTIONS = [
  { value: 'gpu-h100', label: 'H100 GPU', price: '$5.49/hr' },
  { value: 'gpu-h100-2x', label: '2x H100 GPU', price: '$10.98/hr' },
  { value: 'gpu-h100-4x', label: '4x H100 GPU', price: '$21.96/hr' },
  { value: 'gpu-h100-8x', label: '8x H100 GPU', price: '$43.92/hr' },
];

export function VideoEditor() {
  const { description, setDescription, generateVideo, isGenerating } = useVideoDescription();
  const [selectedHardware, setSelectedHardware] = useState('gpu-h100');

  const handleHardwareChange = (value: string) => {
    setSelectedHardware(value);
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
          <ToolButton icon={Plus} onClick={() => {}} tooltip="Média hozzáadása" />
          <ToolButton icon={Image} onClick={() => {}} tooltip="Kép hozzáadása" />
          <ToolButton icon={Type} onClick={() => {}} tooltip="Szöveg hozzáadása" />
          <ToolButton icon={Clock} label="16:9" />
          <ToolButton icon={Video} label="720p" />
          <div className="relative group/hardware">
            <ToolButton 
              icon={Cpu} 
              label={HARDWARE_OPTIONS.find(opt => opt.value === selectedHardware)?.label || 'GPU'} 
              tooltip="Hardver konfiguráció"
            />
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 rounded-lg shadow-xl opacity-0 group-hover/hardware:opacity-100 transition-opacity pointer-events-none group-hover/hardware:pointer-events-auto z-50">
              {HARDWARE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleHardwareChange(option.value)}
                  className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    selectedHardware === option.value ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-sm opacity-75">{option.price}</span>
                </button>
              ))}
              <div className="absolute w-full h-4 bottom-0 translate-y-full" />
            </div>
          </div>
          <button 
            onClick={generateVideo}
            disabled={!description.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Forgatókönyv
          </button>
        </div>
      </div>
    </div>
  );
}

interface ToolButtonProps {
  icon: any;
  label?: string;
  tooltip?: string;
  onClick?: () => void;
}

function ToolButton({ icon: Icon, label, tooltip, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 relative group"
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