import React from 'react';
import { Sidebar } from './components/Sidebar';
import { VideoGrid } from './components/VideoGrid';
import { TopBar } from './components/TopBar';
import { VideoEditor } from './components/VideoEditor';

function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Kiemelt</h1>
          <VideoGrid />
        </main>
        <VideoEditor />
      </div>
    </div>
  );
}

export default App;
