import { useState } from "react";
import { Gemini } from './assistants/Gemini';
import { Chat } from "./components/Chat/Chat";
import styles from "./App.module.css";
import { Controls } from "./components/Controls/Controls";

export type Message = {
  role: string;
  content: string;
};

function App() {
  const assistant = new Gemini();
  const [messages, setMessages] = useState<Message[]>([]);

  function addMessage(message: Message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content: string) {
    addMessage({ content: content, role: "user" });
    try {
      const result: string = await assistant.chat(content);
      addMessage({ content: result, role: "model" })
    }
    catch (error) {
      console.log(error);
      addMessage({
        content: "Sorry, I'm having trouble right now. Please try again later.",
        role: "model",
      })
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;