import { useState, useCallback } from 'react';
import { useMemo } from 'react';
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
  currentView: 'recent' | 'featured' | 'saved' | 'all' | 'favorites' | 'uploads';
  addVideo: (video: Omit<Video, 'id'>) => void;
  setCurrentView: (view: VideoStore['currentView']) => void;
  toggleFavorite: (id: number) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: INITIAL_VIDEOS,
  currentView: 'featured',
  addVideo: (video) => set((state) => ({
    videos: [...state.videos, { ...video, id: Date.now() }]
  })),
  setCurrentView: (view) => set({ currentView: view }),
  toggleFavorite: (id) => set((state) => ({
    videos: state.videos.map(video =>
      video.id === id ? { ...video, isFavorite: !video.isFavorite } : video
    )
  }))
}));

export const addVideoToLibrary = (video: Omit<Video, 'id'>) => {
  useVideoStore.getState().addVideo(video);
};


export function useVideoLibrary() {
  const videos = useVideoStore((state) => state.videos);
  const currentView = useVideoStore((state) => state.currentView);
  const addVideo = useVideoStore((state) => state.addVideo);
  const setCurrentView = useVideoStore((state) => state.setCurrentView);
  const toggleFavorite = useVideoStore((state) => state.toggleFavorite);

  const filteredVideos = useMemo(() => {
    switch (currentView) {
      case 'recent':
        return [...videos].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'featured':
        return videos.filter(video => video.isFeatured);
      case 'saved':
        return videos.filter(video => video.isSaved);
      case 'favorites':
        return videos.filter(video => video.isFavorite);
      case 'uploads':
        return videos.filter(video => video.isUploaded);
      case 'all':
      default:
        return videos;
    }
  }, [videos, currentView]);

  return {
    videos: filteredVideos,
    currentView,
    addVideo,
    setCurrentView,
    toggleFavorite,
  };
}