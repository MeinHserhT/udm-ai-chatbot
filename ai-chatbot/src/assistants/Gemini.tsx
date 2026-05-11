import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

export class Assistant {
    #chat;
    constructor(model: string = "gemini-2.5-flash") {
        this.#chat = ai.chats.create({ model: model, });
    }

    async chat(content: string): Promise<string> {
        const result: GenerateContentResponse = await this.#chat.sendMessage({ message: content });
        return result.text ?? "";
    }

    async *chatStream(content: string): AsyncGenerator<string, void, undefined> {
        const result = await this.#chat.sendMessageStream({ message: content });

        for await (const chunk of result) {
            yield chunk.text ?? "";
        }
    }
}