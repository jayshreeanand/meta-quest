"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runGameLoop = void 0;
const dotenv_1 = require("dotenv");
// Load environment variables first
(0, dotenv_1.config)();
const content_generator_1 = require("./agents/content-generator");
const asset_manager_1 = require("./agents/asset-manager");
const quest_manager_1 = require("./agents/quest-manager");
const state_1 = require("./state");
const messages_1 = require("@langchain/core/messages");
// Create a simple workflow
const workflow = async (input) => {
    // Process content generation
    const contentGenResult = await (0, content_generator_1.contentGeneratorNode)(input);
    // Process quest management
    const questResult = await (0, quest_manager_1.questManagerNode)(contentGenResult);
    // Process asset management
    const assetResult = await (0, asset_manager_1.assetManagerNode)(questResult);
    return assetResult;
};
// Example usage
const runGameLoop = async (playerAddress) => {
    const initialGameState = {
        messages: [
            new messages_1.HumanMessage(`Process game state for player ${playerAddress}`)
        ],
        gameState: {
            ...state_1.initialState.gameState,
            player: {
                ...state_1.initialState.gameState.player,
                address: playerAddress,
            },
        },
        isContentGenerationQuery: false,
        isAssetOperationQuery: false,
        isQuestOperationQuery: false,
    };
    const result = await workflow(initialGameState);
    return result;
};
exports.runGameLoop = runGameLoop;
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
