import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Verify the key is actually loaded
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
if (!apiKey) {
  console.error("Missing VITE_GOOGLE_API_KEY environment variable!");
}

const genAI = new GoogleGenerativeAI(apiKey);

export class Gemini {
  #chat;

  constructor() {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    this.#chat = model.startChat();
  }

  // 2. Use an arrow function to preserve 'this' context if passed as a callback
  chatStream = async function* (content: string) {
    try {
      const result = await this.#chat.sendMessageStream(content);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        yield chunkText;
      }
    } catch (error) {
      // 3. Catch and log the exact error preventing the connection
      console.error("Gemini API Connection Error:", error);
      throw error;
    }
  }
}