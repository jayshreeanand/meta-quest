"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentGeneratorNode = void 0;
const openai_1 = require("@langchain/openai");
const messages_1 = require("@langchain/core/messages");
const contentGenerator = new openai_1.ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
});
const contentGeneratorNode = async (state) => {
    const { messages, gameState } = state;
    const systemPrompt = `You are a game content generator for an RPG game on Aptos blockchain.
Your responses must be valid JSON objects only. Do not include any explanatory text or markdown formatting.
The response must exactly match the specified JSON structure.`;
    const userPrompt = `Current game state:
  - Player Level: ${gameState.player.level}
  - Current Level: ${gameState.currentLevel}
  - Active Quests: ${gameState.player.activeQuests.length}
  
  Generate a new quest that is appropriate for the player's level and current game state.
  The quest should include:
  1. A compelling title and description
  2. Appropriate difficulty level
  3. Required items/assets
  4. Rewards (NFTs or tokens)
  
  Return a JSON object with this exact structure:
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "requirements": [],
    "rewards": [],
    "difficulty": "EASY" | "MEDIUM" | "HARD",
    "status": "ACTIVE",
    "playerAddress": "string"
  }`;
    try {
        const response = await contentGenerator.invoke([
            new messages_1.SystemMessage(systemPrompt),
            new messages_1.HumanMessage(userPrompt)
        ]);
        const newQuest = JSON.parse(response.content.toString());
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
    }
    catch (error) {
        console.error("Error in content generator:", error);
        // Return the original state if there's an error
        return {
            ...state,
            messages: [...messages, new messages_1.AIMessage("Error generating content")],
        };
    }
};
exports.contentGeneratorNode = contentGeneratorNode;
