import { Gemini } from './Gemini';
import { ChatGPT } from './ChatGPT';
import type { Assistant } from './types';
import type { AssistantId } from '../types/assistants';

export function createAssistant(id: AssistantId): Assistant {
  switch (id) {
    case 'gemini':
      return new Gemini();
    // case 'chatgpt':
    //   return new ChatGPT();
    default:
      throw new Error(`Unknown assistant ID: ${id}`);
  }
}