import {
  Clock,
  Star,
  FolderOpen,
  Upload,
  BookmarkCheck,
  Plus,
  Video,
} from 'lucide-react';
import { useVideoLibrary } from '../hooks/useVideoLibrary';

export function Sidebar() {
  const { currentView, setCurrentView } = useVideoLibrary();

  return (
    <aside className="w-64 bg-[#121212] p-4 flex flex-col h-screen">
      <div className="flex items-center gap-2 px-4 py-3">
        <Video className="w-6 h-6 text-blue-500" />
        <span className="font-semibold text-lg">AI Videókészítő</span>
      </div>
      
      <div className="mt-8">
        <h2 className="text-gray-400 text-sm font-medium px-4 mb-2">Böngészés</h2>
        <nav className="space-y-1">
          <SidebarItem 
            icon={Clock} 
            label="Legutóbbi" 
            active={currentView === 'recent'}
            onClick={() => setCurrentView('recent')}
          />
          <SidebarItem 
            icon={Star} 
            label="Kiemelt" 
            active={currentView === 'featured'}
            onClick={() => setCurrentView('featured')}
          />
          <SidebarItem 
            icon={BookmarkCheck} 
            label="Mentett" 
            active={currentView === 'saved'}
            onClick={() => setCurrentView('saved')}
          />
        </nav>
      </div>

      <div className="mt-8">
        <h2 className="text-gray-400 text-sm font-medium px-4 mb-2">Könyvtár</h2>
        <nav className="space-y-1">
          <SidebarItem 
            icon={Video} 
            label="Összes videó" 
            active={currentView === 'all'}
            onClick={() => setCurrentView('all')}
          />
          <SidebarItem 
            icon={Star} 
            label="Kedvencek" 
            active={currentView === 'favorites'}
            onClick={() => setCurrentView('favorites')}
          />
          <SidebarItem 
            icon={Upload} 
            label="Feltöltések" 
            active={currentView === 'uploads'}
            onClick={() => setCurrentView('uploads')}
          />
          <SidebarItem icon={Plus} label="Új mappa" />
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors
        ${active ? 'bg-blue-500/10 text-blue-500' : 'text-gray-300 hover:bg-white/5'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}