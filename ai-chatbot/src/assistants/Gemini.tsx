import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

export class Gemini {
    #chat;
    constructor(model: string = "gemini-2.5-flash") {
        this.#chat = ai.chats.create({ model: model, });
    }

    async chat(content: string) {
        const result: GenerateContentResponse = await this.#chat.sendMessage({ message: content });
        return result.text ?? "";
    }
}