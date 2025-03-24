import React from 'react';
import './GameDashboard.css';

export const GameDashboard: React.FC = () => {
  return (
    <main className="game-dashboard">
      <div className="dashboard-header">
        <h2>Welcome Back, Player!</h2>
        <div className="daily-rewards">
          <span className="reward-label">Daily Rewards Available</span>
          <button className="game-button claim-button">Claim Rewards</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section quests-section">
          <div className="section-header">
            <h3>Active Quests</h3>
            <button className="game-button new-quest-button">New Quest</button>
          </div>
          <div className="quest-grid">
            <div className="quest-card glass-panel">
              <div className="quest-header">
                <span className="quest-difficulty easy">Easy</span>
                <span className="quest-reward">100 XP</span>
              </div>
              <h4 className="quest-title">The First Steps</h4>
              <p className="quest-description">Complete your first quest and earn rewards!</p>
              <div className="quest-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
                <span className="progress-text">60% Complete</span>
              </div>
              <button className="game-button continue-button">Continue Quest</button>
            </div>

            <div className="quest-card glass-panel">
              <div className="quest-header">
                <span className="quest-difficulty medium">Medium</span>
                <span className="quest-reward">250 XP</span>
              </div>
              <h4 className="quest-title">Collect Resources</h4>
              <p className="quest-description">Gather rare materials for crafting.</p>
              <div className="quest-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '30%' }}></div>
                </div>
                <span className="progress-text">30% Complete</span>
              </div>
              <button className="game-button continue-button">Continue Quest</button>
            </div>

            <div className="quest-card glass-panel">
              <div className="quest-header">
                <span className="quest-difficulty hard">Hard</span>
                <span className="quest-reward">500 XP</span>
              </div>
              <h4 className="quest-title">Defeat the Boss</h4>
              <p className="quest-description">Challenge the dungeon boss and claim victory!</p>
              <div className="quest-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%' }}></div>
                </div>
                <span className="progress-text">80% Complete</span>
              </div>
              <button className="game-button continue-button">Continue Quest</button>
            </div>
          </div>
        </section>

        <section className="dashboard-section stats-section">
          <h3>Game Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <span className="stat-icon">🎮</span>
              <div className="stat-info">
                <span className="stat-value">12</span>
                <span className="stat-label">Quests Completed</span>
              </div>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-icon">🏆</span>
              <div className="stat-info">
                <span className="stat-value">5</span>
                <span className="stat-label">Achievements</span>
              </div>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-icon">💎</span>
              <div className="stat-info">
                <span className="stat-value">1,234</span>
                <span className="stat-label">Total Rewards</span>
              </div>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-icon">⚔️</span>
              <div className="stat-info">
                <span className="stat-value">8</span>
                <span className="stat-label">Bosses Defeated</span>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-section inventory-section">
          <h3>Recent Items</h3>
          <div className="inventory-grid">
            <div className="item-card glass-panel">
              <div className="item-image">
                <img src="https://api.dicebear.com/7.x/icons/svg?seed=sword" alt="Sword" />
              </div>
              <div className="item-info">
                <h4>Mystic Sword</h4>
                <span className="item-rarity legendary">Legendary</span>
              </div>
            </div>
            <div className="item-card glass-panel">
              <div className="item-image">
                <img src="https://api.dicebear.com/7.x/icons/svg?seed=shield" alt="Shield" />
              </div>
              <div className="item-info">
                <h4>Guardian Shield</h4>
                <span className="item-rarity epic">Epic</span>
              </div>
            </div>
            <div className="item-card glass-panel">
              <div className="item-image">
                <img src="https://api.dicebear.com/7.x/icons/svg?seed=potion" alt="Potion" />
              </div>
              <div className="item-info">
                <h4>Health Potion</h4>
                <span className="item-rarity common">Common</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}; 