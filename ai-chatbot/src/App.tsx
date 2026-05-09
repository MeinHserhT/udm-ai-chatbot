import { useState } from "react";
import styles from "./App.module.css";
import { Assistant } from './assistants/Gemini';
// import { Assistant } from './assistants/ChatGPT';
import { Chat } from "./components/Chat/Chat";
import { Loader } from "./components/Loader/Loader";
import { Controls } from "./components/Controls/Controls";
import type { Message } from "./components/Message";
import { MenuIcon } from "./components/MenuIcon/MenuIcon";


function App() {
	const assistant = new Assistant();
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isStreaming, setIsStreaming] = useState(false);
	const [isNavCollapsed, setIsNavCollapsed] = useState(false);

	function toggleNav() {
		setIsNavCollapsed(prevState => !prevState);
	}

	function clearChat() {
		setMessages([]);
	}

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
			setIsLoading(false);
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
		<div className={styles.App} >
			{isLoading && <Loader />}
			<div className={`${styles.Navbar} ${isNavCollapsed ? styles.NavbarCollapsed : ''}`} >
				<MenuIcon onClick={toggleNav} />
				<img className={styles.Logo} src="/logo.png" />
				<div className={styles.Setting}>
					<button onClick={clearChat} >
						<img src="/plus.png" />
						<p>New Chat</p>
					</button>
					<button >
						<img src="/settings.png"/>
						<p>Settings</p>
					</button>
				</div>

			</div>
			<div className={styles.Main}>
				<div className={styles.ChatContainer}>
					<Chat messages={messages} />
				</div>
				<Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend} />
			</div>
		</div>
	);
}

export default App;
