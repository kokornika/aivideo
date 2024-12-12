import React from 'react';
import {
  Clock,
  Star,
  FolderOpen,
  Upload,
  BookmarkCheck,
  Plus,
  Video,
} from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#121212] p-4 flex flex-col h-screen">
      <div className="flex items-center gap-2 px-4 py-3">
        <Video className="w-6 h-6 text-blue-500" />
        <span className="font-semibold text-lg">AI Videókészítő</span>
      </div>
      
      <div className="mt-8">
        <h2 className="text-gray-400 text-sm font-medium px-4 mb-2">Böngészés</h2>
        <nav className="space-y-1">
          <SidebarItem icon={Clock} label="Legutóbbi" />
          <SidebarItem icon={Star} label="Kiemelt" active />
          <SidebarItem icon={BookmarkCheck} label="Mentett" />
        </nav>
      </div>

      <div className="mt-8">
        <h2 className="text-gray-400 text-sm font-medium px-4 mb-2">Könyvtár</h2>
        <nav className="space-y-1">
          <SidebarItem icon={Video} label="Összes videó" />
          <SidebarItem icon={Star} label="Kedvencek" />
          <SidebarItem icon={Upload} label="Feltöltések" />
          <SidebarItem icon={Plus} label="Új mappa" />
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ icon: Icon, label, active }: { icon: any; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors
        ${active ? 'bg-blue-500/10 text-blue-500' : 'text-gray-300 hover:bg-white/5'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}