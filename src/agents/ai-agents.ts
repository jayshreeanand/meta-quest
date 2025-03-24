import { ChatOpenAI } from "@langchain/openai";

// Initialize AI agents with environment variables
export const contentGenerator = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export const assetManager = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export const questManager = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
}); 