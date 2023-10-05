import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import GameConfig from './components/GameConfig';
import MemoryGame from './components/MemoryGame';

function App() {
  const [gameConfig, setGameConfig] = useState(null);

  const handleStartGame = (config) => {
    setGameConfig(config);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/config" element={<GameConfig onStartGame={handleStartGame} />} />
          <Route path="/game" element={gameConfig ? <MemoryGame config={gameConfig} /> : <Navigate to="/config" />} />
          <Route index element={<Navigate to="/config" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
