import { useState } from "react";
import styles from "./App.module.css";
import { Assistant } from './assistants/Gemini';
// import { Assistant } from './assistants/ChatGPT';
import { Chat } from "./components/Chat/Chat";
import { Loader } from "./components/Loader/Loader";
import { Controls } from "./components/Controls/Controls";
import type { Message } from "./components/Message";


function App() {
	const assistant = new Assistant();
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);


	function addMessage(message: Message) {
		setMessages((prevMessages) => [...prevMessages, message]);
	}

	async function handleContentSend(content: string) {
		addMessage({ content: content, role: "user" });
		setIsLoading(true);
		try {
			const result: string = await assistant.chat(content);
			addMessage({ content: result, role: "model" })
		} catch (error) {
			console.log(error);
			addMessage({
				content: "Sorry, I'm having trouble right now. Please try again later.",
				role: "model",
			})
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className={styles.App}>
			{isLoading && <Loader />}
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