import type { AssistantId } from '../types/assistants';

export interface Assistant {
  chatStream(content: string): AsyncGenerator<string, void, unknown>;
}

export interface AssistantConfig {
  id: AssistantId;
  name: string;
  description: string;
}

export const assistants: AssistantConfig[] = [
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'The latest and most powerful model from Google.',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'The well-known and battle-tested model from OpenAI.',
  },
];
