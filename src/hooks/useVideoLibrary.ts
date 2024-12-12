import { useState } from 'react';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
}

const INITIAL_VIDEOS = [
  {
    id: 1,
    title: "AI Portré",
    thumbnail: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Divat Bemutató",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Sarki Vadvilág",
    thumbnail: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    title: "Óceáni Hullámok",
    thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1000",
  },
];

export function useVideoLibrary() {
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);

  const addVideo = (video: Omit<Video, 'id'>) => {
    setVideos(prev => [...prev, { ...video, id: Date.now() }]);
  };

  return {
    videos,
    addVideo,
  };
}