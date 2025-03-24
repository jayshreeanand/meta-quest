export interface GameAsset {
  id: string;
  type: 'NFT' | 'TOKEN';
  name: string;
  description: string;
  metadata: Record<string, any>;
  owner: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  requirements: GameAsset[];
  rewards: GameAsset[];
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
  playerAddress: string;
}

export interface Player {
  address: string;
  level: number;
  experience: number;
  inventory: GameAsset[];
  activeQuests: Quest[];
  completedQuests: Quest[];
}

export interface GameState {
  player: Player;
  currentLevel: number;
  availableQuests: Quest[];
  gameEconomy: {
    dropRates: Record<string, number>;
    rewardMultipliers: Record<string, number>;
  };
} 