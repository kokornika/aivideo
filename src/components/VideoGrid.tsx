import React from 'react';
import { useVideoLibrary } from '../hooks/useVideoLibrary';

export function VideoGrid() {
  const { videos } = useVideoLibrary();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <div key={video.id} className="group relative cursor-pointer" onClick={() => window.open(video.url, '_blank')}>
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <h3 className="text-white font-medium mb-1">{video.title}</h3>
            <p className="text-white/80 text-sm">{formatDate(video.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}