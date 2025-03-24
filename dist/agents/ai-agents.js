"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questManager = exports.assetManager = exports.contentGenerator = void 0;
const openai_1 = require("@langchain/openai");
// Initialize AI agents with environment variables
exports.contentGenerator = new openai_1.ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
});
exports.assetManager = new openai_1.ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
});
exports.questManager = new openai_1.ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
});
