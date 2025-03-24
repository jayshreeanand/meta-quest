"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questManagerNode = void 0;
const ai_agents_1 = require("./ai-agents");
const messages_1 = require("@langchain/core/messages");
const questManagerNode = async (state) => {
    const { messages, gameState } = state;
    const systemPrompt = `You are a quest manager for an RPG game on Aptos blockchain.
Your responses must be valid JSON objects only. Do not include any explanatory text or markdown formatting.
The response must exactly match the specified JSON structure.`;
    const userPrompt = `Current game state:
  - Player Level: ${gameState.player.level}
  - Active Quests: ${gameState.player.activeQuests.length}
  - Completed Quests: ${gameState.player.completedQuests.length}
  - Available Quests: ${gameState.availableQuests.length}
  
  Based on the player's progress and current game state:
  1. Evaluate active quests for completion
  2. Suggest new quests to start
  3. Adjust quest difficulty based on player performance
  4. Generate appropriate rewards
  
  Return a JSON object with this exact structure:
  {
    "completedQuests": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "requirements": [],
        "rewards": [],
        "difficulty": "EASY" | "MEDIUM" | "HARD",
        "status": "COMPLETED",
        "playerAddress": "string"
      }
    ],
    "newActiveQuests": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "requirements": [],
        "rewards": [],
        "difficulty": "EASY" | "MEDIUM" | "HARD",
        "status": "ACTIVE",
        "playerAddress": "string"
      }
    ],
    "adjustedQuests": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "requirements": [],
        "rewards": [],
        "difficulty": "EASY" | "MEDIUM" | "HARD",
        "status": "ACTIVE",
        "playerAddress": "string"
      }
    ]
  }`;
    try {
        const response = await ai_agents_1.questManager.invoke([
            new messages_1.SystemMessage(systemPrompt),
            new messages_1.HumanMessage(userPrompt)
        ]);
        const questUpdates = JSON.parse(response.content.toString());
        // Update game state with quest changes
        const updatedGameState = {
            ...gameState,
            player: {
                ...gameState.player,
                activeQuests: [
                    ...gameState.player.activeQuests.filter((quest) => !questUpdates.completedQuests.find((q) => q.id === quest.id)),
                    ...questUpdates.newActiveQuests,
                ],
                completedQuests: [
                    ...gameState.player.completedQuests,
                    ...questUpdates.completedQuests,
                ],
            },
            availableQuests: gameState.availableQuests.map((quest) => {
                const adjustedQuest = questUpdates.adjustedQuests.find((q) => q.id === quest.id);
                return adjustedQuest || quest;
            }),
        };
        return {
            messages: [...messages, response],
            gameState: updatedGameState,
            isContentGenerationQuery: false,
            isAssetOperationQuery: false,
            isQuestOperationQuery: true,
        };
    }
    catch (error) {
        console.error("Error in quest manager:", error);
        // Return the original state if there's an error
        return {
            ...state,
            messages: [...messages, new messages_1.AIMessage("Error processing quests")],
        };
    }
};
exports.questManagerNode = questManagerNode;
