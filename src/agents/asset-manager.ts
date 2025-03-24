import { StateGraph } from "@langchain/langgraph";
import { GameStateAnnotation } from "../state";
import { GameAsset } from "../types/game";
import { Aptos, Network, AptosConfig } from "@aptos-labs/ts-sdk";
import { assetManager } from "./ai-agents";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

// Initialize Aptos client with the new SDK
const config = new AptosConfig({
  network: Network.TESTNET
});
const client = new Aptos(config);

export const assetManagerNode = async (state: GameStateAnnotation): Promise<GameStateAnnotation> => {
  const { messages, gameState } = state;
  
  const systemPrompt = `You are an asset manager for an RPG game on Aptos blockchain.
Your responses must be valid JSON objects only. Do not include any explanatory text or markdown formatting.
The response must exactly match the specified JSON structure.`;

  const userPrompt = `Current game state:
  - Player Address: ${gameState.player.address}
  - Player Level: ${gameState.player.level}
  - Inventory Size: ${gameState.player.inventory.length}
  
  Based on the player's progress and achievements, determine what assets (NFTs or tokens) should be minted or transferred.
  Consider:
  1. Quest completion rewards
  2. Level-up bonuses
  3. Special achievements
  4. Trading opportunities
  
  Return a JSON array of GameAsset objects with this exact structure:
  [
    {
      "id": "string",
      "type": "NFT" | "TOKEN",
      "name": "string",
      "description": "string",
      "metadata": {},
      "owner": "string",
      "rarity": "COMMON" | "RARE" | "EPIC" | "LEGENDARY"
    }
  ]`;

  try {
    const response = await assetManager.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt)
    ]);
    
    const newAssets: GameAsset[] = JSON.parse(response.content.toString());
    
    // Here you would implement the actual blockchain operations
    // For now, we'll just update the game state
    return {
      messages: [...messages, response],
      gameState: {
        ...gameState,
        player: {
          ...gameState.player,
          inventory: [...gameState.player.inventory, ...newAssets],
        },
      },
      isContentGenerationQuery: false,
      isAssetOperationQuery: true,
      isQuestOperationQuery: false,
    };
  } catch (error) {
    console.error("Error in asset manager:", error);
    // Return the original state if there's an error
    return {
      ...state,
      messages: [...messages, new AIMessage("Error processing assets")],
    };
  }
}; 