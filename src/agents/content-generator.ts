import { ChatOpenAI } from "@langchain/openai";
import { StateGraph } from "@langchain/langgraph";
import { GameStateAnnotation } from "../state";
import { Quest } from "../types/game";

const contentGenerator = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export const contentGeneratorNode = async (state: GameStateAnnotation): Promise<GameStateAnnotation> => {
  const { messages, gameState } = state;
  
  const prompt = `You are a game content generator for an RPG game on Aptos blockchain.
  Current game state:
  - Player Level: ${gameState.player.level}
  - Current Level: ${gameState.currentLevel}
  - Active Quests: ${gameState.player.activeQuests.length}
  
  Generate a new quest that is appropriate for the player's level and current game state.
  The quest should include:
  1. A compelling title and description
  2. Appropriate difficulty level
  3. Required items/assets
  4. Rewards (NFTs or tokens)
  
  Format the response as a JSON object matching the Quest interface.`;

  const response = await contentGenerator.invoke(prompt);
  const newQuest: Quest = JSON.parse(response.content.toString());
  
  return {
    messages: [...messages, response],
    gameState: {
      ...gameState,
      availableQuests: [...gameState.availableQuests, newQuest],
    },
    isContentGenerationQuery: true,
    isAssetOperationQuery: false,
    isQuestOperationQuery: false,
  };
}; 