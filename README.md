# Aptos GameFi Project

A modern GameFi project built on the Aptos blockchain using Move Agent Kit and React.

## Project Structure

```
gamefi-project/
├── frontend/                 # React frontend application
│   ├── frontend/            # Create React App with TypeScript
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── styles/     # CSS styles
│   │   │   └── App.tsx     # Main application component
│   │   └── package.json    # Frontend dependencies
│   └── package.json        # Root package.json
├── src/                     # Backend source code
│   ├── content-generator.ts # AI content generation
│   ├── asset-manager.ts    # Asset management
│   ├── quest-manager.ts    # Quest system
│   └── index.ts           # Main entry point
└── package.json           # Root dependencies
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Aptos CLI
- Move Agent Kit

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd gamefi-project
   ```

2. Install dependencies:

   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend/frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Development

### Running the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend/frontend
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Backend

1. From the root directory:
   ```bash
   npm run dev
   ```

## Features

- Modern React UI with TypeScript
- Glassmorphism design with gaming aesthetics
- Real-time game state management
- AI-generated game content
- Asset management system
- Quest system
- Wallet integration

## Components

### GameHeader

- Player stats display
- Wallet connection
- Player profile

### GameSidebar

- Navigation menu
- Quick actions
- Social features

### GameDashboard

- Active quests
- Game statistics
- Recent items
- Daily rewards

## Styling

The project uses a modern gaming aesthetic with:

- Glassmorphism effects
- Gradient backgrounds
- Glowing animations
- Custom scrollbars
- Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
