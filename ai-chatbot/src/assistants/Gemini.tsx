import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Assistant } from './types';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
if (!apiKey) {
  console.error('Missing VITE_GOOGLE_API_KEY environment variable!');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

export class Gemini implements Assistant {
  private chat;

  constructor() {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    this.chat = model.startChat();
  }

  public async *chatStream(content: string): AsyncGenerator<string, void, unknown> {
    try {
      const result = await this.chat.sendMessageStream(content);

      for await (const chunk of result.stream) {
        yield chunk.text();
      }
    } catch (error) {
      console.error('Gemini API Connection Error:', error);
      throw error;
    }
  }
}