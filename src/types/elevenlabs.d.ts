// Type declarations for ElevenLabs ConvAI custom element
declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': {
      'agent-id'?: string;
      children?: React.ReactNode;
    }
  }
}

// Global type for ElevenLabs widget
declare global {
  interface Window {
    ElevenLabs?: any;
  }
}

export {};
