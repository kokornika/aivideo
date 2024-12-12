import { useState, useCallback } from 'react';
import { create } from 'zustand';

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

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  createdAt: string;
}

interface VideoStore {
  videos: Video[];
  addVideo: (video: Omit<Video, 'id'>) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: INITIAL_VIDEOS,
  addVideo: (video) => set((state) => ({
    videos: [...state.videos, { ...video, id: Date.now() }]
  }))
}));

export const addVideoToLibrary = (video: Omit<Video, 'id'>) => {
  useVideoStore.getState().addVideo(video);
};


export function useVideoLibrary() {
  const videos = useVideoStore((state) => state.videos);
  const addVideo = useVideoStore((state) => state.addVideo);

  return {
    videos,
    addVideo,
  };
}