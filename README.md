# AI-Powered GameFi Project on Aptos

This project demonstrates an AI-powered GameFi (Game Finance) system built on the Aptos blockchain using Move Agent Kit. The system uses AI agents to generate dynamic game content, manage in-game assets, and create an adaptive gameplay experience.

## Features

- **AI Content Generation**: Dynamic quest and level generation based on player behavior
- **Asset Management**: Automated NFT and token operations for in-game items and rewards
- **Quest System**: Adaptive quest system with dynamic difficulty and rewards
- **Blockchain Integration**: Seamless interaction with Aptos blockchain for asset management

## Prerequisites

- Node.js (v14 or higher)
- npm or pnpm
- Aptos CLI (optional, for contract deployment)
- OpenAI API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd gamefi-project
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
```

4. Build the project:

```bash
npm run build
# or
pnpm build
```

## Usage

1. Run the example script:

```bash
npm run start
# or
pnpm start
```

2. The example will demonstrate:
   - Quest generation
   - Asset management
   - Game state updates
   - Blockchain interactions

## Project Structure

```
gamefi-project/
├── src/
│   ├── agents/
│   │   ├── content-generator.ts
│   │   ├── asset-manager.ts
│   │   └── quest-manager.ts
│   ├── types/
│   │   └── game.ts
│   ├── state.ts
│   ├── index.ts
│   └── example.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture

The project uses a LangGraph-based workflow with three main agents:

1. **Content Generator**: Creates dynamic quests and levels
2. **Asset Manager**: Handles NFT and token operations
3. **Quest Manager**: Manages quest progression and rewards

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
