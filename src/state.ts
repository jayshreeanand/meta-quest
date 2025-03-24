import { BaseMessage } from "@langchain/core/messages";
import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { GameState } from "./types/game";

export const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  gameState: Annotation<GameState>({
    reducer: (x, y) => y ?? x,
    default: () => ({
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
    }),
  }),
  isContentGenerationQuery: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false,
  }),
  isAssetOperationQuery: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false,
  }),
  isQuestOperationQuery: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false,
  }),
}); 