import React from 'react';
import './GameHeader.css';

export const GameHeader: React.FC = () => {
  return (
    <header className="game-header glass-panel">
      <div className="header-left">
        <h1 className="game-title">MetaQuest AI</h1>
        <div className="player-stats">
          <div className="stat-item">
            <span className="stat-label">Level</span>
            <span className="stat-value">5</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">XP</span>
            <span className="stat-value">1,234</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Coins</span>
            <span className="stat-value">500</span>
          </div>
        </div>
      </div>
      <div className="header-right">
        <button className="game-button connect-wallet">Connect Wallet</button>
        <div className="player-profile">
          <div className="player-avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=player" alt="Player Avatar" />
          </div>
          <div className="player-info">
            <span className="player-name">Player123</span>
            <span className="player-address">0x1234...5678</span>
          </div>
        </div>
      </div>
    </header>
  );
}; 