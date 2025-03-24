import { config } from 'dotenv';
// Load environment variables first
config();

import { END, START, StateGraph } from "@langchain/langgraph";
import { contentGeneratorNode } from "./agents/content-generator";
import { assetManagerNode } from "./agents/asset-manager";
import { questManagerNode } from "./agents/quest-manager";
import { GameStateAnnotation, initialState } from "./state";
import { HumanMessage } from "@langchain/core/messages";
import { Player, GameState } from "./types/game";

// Create a simple workflow
const workflow = async (input: GameStateAnnotation): Promise<GameStateAnnotation> => {
  // Process content generation
  const contentGenResult = await contentGeneratorNode(input);
  
  // Process quest management
  const questResult = await questManagerNode(contentGenResult);
  
  // Process asset management
  const assetResult = await assetManagerNode(questResult);
  
  return assetResult;
};

// Example usage
const runGameLoop = async (playerAddress: string) => {
  const initialGameState = {
    messages: [
      new HumanMessage(`Process game state for player ${playerAddress}`)
    ],
    gameState: {
      ...initialState.gameState,
      player: {
        ...initialState.gameState.player,
        address: playerAddress,
      },
    },
    isContentGenerationQuery: false,
    isAssetOperationQuery: false,
    isQuestOperationQuery: false,
  } satisfies GameStateAnnotation;

  const result = await workflow(initialGameState);
  return result;
};

// Export the game loop function
export { runGameLoop };

// Run the game loop if this file is executed directly
if (require.main === module) {
  const testPlayerAddress = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
  console.log("Starting game loop for player:", testPlayerAddress);
  
  runGameLoop(testPlayerAddress)
    .then(result => {
      console.log("Game loop completed successfully!");
      console.log("Final game state:", JSON.stringify(result.gameState, null, 2));
    })
    .catch(error => {
      console.error("Error in game loop:", error);
    });
} 