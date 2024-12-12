import React from 'react';
import { Bell, User } from 'lucide-react';

export function TopBar() {
  return (
    <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-full">
          <Bell className="w-5 h-5 text-gray-300" />
        </button>
        <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}