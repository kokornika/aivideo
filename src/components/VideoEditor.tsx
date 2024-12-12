import React, { useState } from 'react';
import { Plus, Video, Clock, Image, Type } from 'lucide-react';
import { useVideoDescription } from '../hooks/useVideoDescription';

export function VideoEditor() {
  const { description, setDescription, generateVideo, isGenerating } = useVideoDescription();

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