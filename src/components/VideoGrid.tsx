import { useVideoLibrary } from '../hooks/useVideoLibrary';
import { Star } from 'lucide-react';

export function VideoGrid() {
  const { videos, toggleFavorite, currentView } = useVideoLibrary();

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
        <div key={video.id} className="group relative">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
              onClick={() => window.open(video.url, '_blank')}
            />
          </div>
          <button
            onClick={() => toggleFavorite(video.id)}
            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <Star className={`w-5 h-5 ${video.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 pointer-events-none">
            <h3 className="text-white font-medium mb-1">{video.title}</h3>
            <p className="text-white/80 text-sm">{formatDate(video.createdAt)}</p>
          </div>
        </div>
      ))}
      {videos.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-400">
          {currentView === 'favorites' && 'Még nincsenek kedvenc videóid'}
          {currentView === 'uploads' && 'Még nem töltöttél fel videókat'}
          {currentView === 'saved' && 'Még nincsenek mentett videóid'}
          {currentView === 'recent' && 'Még nincsenek videóid'}
          {currentView === 'featured' && 'Nincsenek kiemelt videók'}
          {currentView === 'all' && 'Még nincsenek videóid'}
        </div>
      )}
    </div>
  );
}