import React from 'react';
import './GameSidebar.css';

export const GameSidebar: React.FC = () => {
  return (
    <aside className="game-sidebar glass-panel">
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="section-title">Main Menu</h3>
          <ul className="nav-list">
            <li className="nav-item active">
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Dashboard</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">📜</span>
              <span className="nav-text">Quests</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">🎒</span>
              <span className="nav-text">Inventory</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">🏪</span>
              <span className="nav-text">Marketplace</span>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="section-title">Quick Actions</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <span className="nav-icon">🎁</span>
              <span className="nav-text">Daily Rewards</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">🏆</span>
              <span className="nav-text">Achievements</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">🎯</span>
              <span className="nav-text">Events</span>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="section-title">Social</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <span className="nav-icon">👥</span>
              <span className="nav-text">Friends</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">💬</span>
              <span className="nav-text">Chat</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">📊</span>
              <span className="nav-text">Leaderboard</span>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="settings-button">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Settings</span>
        </button>
      </div>
    </aside>
  );
}; 