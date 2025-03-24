import { ChatOpenAI } from "@langchain/openai";
import { StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "../state";
import { Quest, GameState } from "../types/game";

const questManager = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
});

export const questManagerNode = async (state: any) => {
  const { messages, gameState } = state;
  
  const prompt = `You are a quest manager for an RPG game on Aptos blockchain.
  Current game state:
  - Player Level: ${gameState.player.level}
  - Active Quests: ${gameState.player.activeQuests.length}
  - Completed Quests: ${gameState.player.completedQuests.length}
  - Available Quests: ${gameState.availableQuests.length}
  
  Based on the player's progress and current game state:
  1. Evaluate active quests for completion
  2. Suggest new quests to start
  3. Adjust quest difficulty based on player performance
  4. Generate appropriate rewards
  
  Format the response as a JSON object with:
  {
    "completedQuests": Quest[],
    "newActiveQuests": Quest[],
    "adjustedQuests": Quest[]
  }`;

  const response = await questManager.invoke(prompt);
  const questUpdates = JSON.parse(response.content.toString());
  
  // Update game state with quest changes
  const updatedGameState: GameState = {
    ...gameState,
    player: {
      ...gameState.player,
      activeQuests: [
        ...gameState.player.activeQuests.filter(
          (quest: Quest) => !questUpdates.completedQuests.find((q: Quest) => q.id === quest.id)
        ),
        ...questUpdates.newActiveQuests,
      ],
      completedQuests: [
        ...gameState.player.completedQuests,
        ...questUpdates.completedQuests,
      ],
    },
    availableQuests: gameState.availableQuests.map((quest: Quest) => {
      const adjustedQuest = questUpdates.adjustedQuests.find((q: Quest) => q.id === quest.id);
      return adjustedQuest || quest;
    }),
  };
  
  return {
    messages: [...messages, response],
    gameState: updatedGameState,
  };
}; 