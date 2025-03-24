import { END, START, StateGraph } from "@langchain/langgraph";
import { contentGeneratorNode } from "./agents/content-generator";
import { assetManagerNode } from "./agents/asset-manager";
import { questManagerNode } from "./agents/quest-manager";
import { StateAnnotation } from "./state";
import { HumanMessage } from "@langchain/core/messages";

// Create the workflow graph
const workflow = new StateGraph(StateAnnotation)
  .addNode("contentGenerator", contentGeneratorNode)
  .addNode("assetManager", assetManagerNode)
  .addNode("questManager", questManagerNode)
  .addEdge(START, "contentGenerator")
  .addEdge("contentGenerator", "questManager")
  .addEdge("questManager", "assetManager")
  .addEdge("assetManager", END);

// Compile the workflow
export const graph = workflow.compile();

// Example usage
const runGameLoop = async (playerAddress: string) => {
  const result = await graph.invoke({
    messages: [
      new HumanMessage(`Process game state for player ${playerAddress}`)
    ],
    gameState: {
      player: {
        address: playerAddress,
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
  });

  return result;
};

// Export the game loop function
export { runGameLoop }; 