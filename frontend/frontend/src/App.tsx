import React from 'react';
import { GameHeader } from './components/GameHeader';
import { GameSidebar } from './components/GameSidebar';
import { GameDashboard } from './components/GameDashboard';
import './styles/App.css';

function App() {
  return (
    <div className="game-container">
      <GameHeader />
      <div className="game-content">
        <GameSidebar />
        <GameDashboard />
      </div>
    </div>
  );
}

export default App; 