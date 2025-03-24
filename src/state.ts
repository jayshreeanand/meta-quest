import { BaseMessage } from "@langchain/core/messages";
import { GameState } from "./types/game";
import { StateGraph } from "@langchain/langgraph";

// Define the state interface
export interface GameStateAnnotation {
  messages: BaseMessage[];
  gameState: GameState;
  isContentGenerationQuery: boolean;
  isAssetOperationQuery: boolean;
  isQuestOperationQuery: boolean;
}

// Create the initial state
export const initialState: GameStateAnnotation = {
  messages: [],
  gameState: {
    player: {
      address: "",
      level: 1,
      experience: 0,
      inventory: [],
      activeQuests: [],
      completedQuests: [],
    },
    currentLevel: 1,
    availableQuests: [],
    gameEconomy: {
      dropRates: {},
      rewardMultipliers: {},
    },
  },
  isContentGenerationQuery: false,
  isAssetOperationQuery: false,
  isQuestOperationQuery: false,
};

// Create a function to update state
export function updateState(currentState: GameStateAnnotation, newState: Partial<GameStateAnnotation>): GameStateAnnotation {
  return {
    ...currentState,
    messages: [...currentState.messages, ...(newState.messages || [])],
    gameState: {
      ...currentState.gameState,
      ...(newState.gameState || {}),
    },
    isContentGenerationQuery: newState.isContentGenerationQuery ?? currentState.isContentGenerationQuery,
    isAssetOperationQuery: newState.isAssetOperationQuery ?? currentState.isAssetOperationQuery,
    isQuestOperationQuery: newState.isQuestOperationQuery ?? currentState.isQuestOperationQuery,
  };
}

// Create the state graph with channels
export const stateGraph = new StateGraph<GameStateAnnotation>({
  channels: {
    messages: {
      value: null,
      default: () => [],
    },
    gameState: {
      value: null,
      default: () => initialState.gameState,
    },
    isContentGenerationQuery: {
      value: null,
      default: () => false,
    },
    isAssetOperationQuery: {
      value: null,
      default: () => false,
    },
    isQuestOperationQuery: {
      value: null,
      default: () => false,
    },
  },
}); 