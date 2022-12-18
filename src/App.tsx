import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AlbumSong from './components/AlbumSong';

function App() {
  return (   
    <div className="relative flex">
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#45684f]">
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
          <Routes>
              <Route path="/" element={<Home />} />  
              <Route path="/songs" element={<AlbumSong />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;