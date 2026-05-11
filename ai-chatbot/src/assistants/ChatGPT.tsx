import OpenAI from "openai";
import type { Message } from "../components/Message";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_CHATGPT_API_KEY,
    dangerouslyAllowBrowser: true
});

export class Assistant {
    #model

    constructor(model: string = "gpt-5.4") {
        this.#model = model
    }

    async chat(content: string, history: Message[] = []) {
        try {
            const result = await openai.chat.completions.create({
                model: this.#model,
                messages: [...history as ChatCompletionMessageParam[], { role: "user", content: content }]
            })
            const choice = result.choices[0];
            if (choice) {
                return choice.message;
            }
            throw new Error("No choice was returned from the OpenAI API.");
        }
        catch (error) {
            console.error("Error calling OpenAI API:", error);
            throw error;
        }
    }
}