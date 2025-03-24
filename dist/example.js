"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function main() {
    try {
        // Example player address
        const playerAddress = "0x123..."; // Replace with actual player address
        console.log("Starting game loop for player:", playerAddress);
        // Run the game loop
        const result = await (0, index_1.runGameLoop)(playerAddress);
        // Log the results
        console.log("\nGame State Update:");
        console.log("------------------");
        console.log("Player Level:", result.gameState.player.level);
        console.log("Active Quests:", result.gameState.player.activeQuests.length);
        console.log("Completed Quests:", result.gameState.player.completedQuests.length);
        console.log("Inventory Size:", result.gameState.player.inventory.length);
        // Log available quests
        console.log("\nAvailable Quests:");
        result.gameState.availableQuests.forEach((quest) => {
            console.log(`- ${quest.title} (${quest.difficulty})`);
        });
    }
    catch (error) {
        console.error("Error running game loop:", error);
    }
}
// Run the example
main();
