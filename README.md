# Camden Burke - Digital Business Card

A modern, responsive digital business card website with AI chat integration.

## Features

- 🎨 Clean, minimalist design with teal color scheme
- 📱 Fully responsive (desktop & mobile optimized)
- 💬 ElevenLabs AI assistant integration
- 🎯 Smooth animations and transitions
- ♿ Accessible (keyboard navigation, ARIA labels)

## Tech Stack

- React 18 with TypeScript
- Vite for fast development
- Pure CSS with CSS variables
- ElevenLabs Conversational AI widget

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your API keys:
   ```
   VITE_ELEVENLABS_API_KEY=your_key_here
   VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
   VITE_OPENAI_API_KEY=your_openai_key_here
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## API Integration

The chat functionality requires a backend API endpoint at `/api/chat`. For production:

1. Set up a serverless function (Netlify Functions, Vercel Functions, etc.)
2. Handle OpenAI API calls server-side to protect API keys
3. Return responses in format: `{ message: "response text" }`

## Deployment

This site is configured for deployment on Netlify at `camdenburke.co.uk`.

## License

© 2024 Camden Burke / AppVantix LLC
