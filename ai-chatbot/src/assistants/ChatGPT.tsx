import OpenAI from "openai";
import type { Message } from "../components/Message";

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
                messages: [...history, { content, role: "user" }]
            })
            return result.choices[0].message;
        }
        catch (error) { console.log(error) }
    }
}