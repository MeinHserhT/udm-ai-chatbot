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
	const [isStreaming, setIsStreaming] = useState(false);

	function updateLastMessageContent(content: string) {
		setMessages((prevMessages) => prevMessages.map((message, index) =>
			index === prevMessages.length - 1
				? { ...message, content: `${message.content}${content}` }
				: message));
	}

	function addMessage(message: Message) {
		setMessages((prevMessages) => [...prevMessages, message]);
	}

	async function handleContentSend(content: string) {
		addMessage({ content: content, role: "user" });
		setIsLoading(true);
		try {
			const result = await assistant.chatStream(content);
			let isFirstChunk: boolean = false;

			for await (const chunk of result) {
				if (!isFirstChunk) {
					isFirstChunk = true;
					addMessage({ content: "", role: "model" });
					setIsLoading(true);
					setIsStreaming(true);
				}
				else {
					setIsLoading(false);
				}
				if (chunk) {
					updateLastMessageContent(chunk);
				}
			}
			setIsStreaming(false);
		} catch (error) {
			console.log(error);
			addMessage({
				content: "Sorry, I'm having trouble right now. Please try again later.",
				role: "model",
			})
			setIsLoading(false);
			setIsStreaming(false);
		}
	}

	return (
		<div className={styles.App}>
			{isLoading && <Loader />}
			<header className={styles.Header}>
				<img className={styles.Logo} src="/icon_light.png" />
				<h2 className={styles.Title}>AI Chatbot</h2>
			</header>
			<div className={styles.ChatContainer}>
				<Chat messages={messages} />
			</div>
			<Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend} />
		</div>
	);
}

export default App;