"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateGraph = exports.initialState = void 0;
exports.updateState = updateState;
const langgraph_1 = require("@langchain/langgraph");
// Create the initial state
exports.initialState = {
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
function updateState(currentState, newState) {
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
exports.stateGraph = new langgraph_1.StateGraph({
    channels: {
        messages: {
            value: null,
            default: () => [],
        },
        gameState: {
            value: null,
            default: () => exports.initialState.gameState,
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
