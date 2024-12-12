import { useState } from 'react';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  createdAt: string;
}

const INITIAL_VIDEOS = [
  {
    id: 1,
    title: "AI Portré",
    thumbnail: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1000",
    url: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2024-03-20T10:00:00Z"
  },
  {
    id: 2,
    title: "Divat Bemutató",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2024-03-20T09:00:00Z"
  },
  {
    id: 3,
    title: "Sarki Vadvilág",
    thumbnail: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1000",
    url: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2024-03-20T08:00:00Z"
  },
  {
    id: 4,
    title: "Óceáni Hullámok",
    thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1000",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2024-03-20T07:00:00Z"
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