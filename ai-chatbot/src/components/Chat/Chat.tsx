import { useEffect, useRef, useMemo } from "react";
import styles from "./Chat.module.css";
import Markdown from "react-markdown";
import type { Message } from "../Message";

const WELCOME_MESSAGE_GROUP: { role: string, content: string }[] = [
	{
		role: "assistant",
		content: "Hello! How can I assist you today?",
	},
];


export function Chat({ messages }: { messages: Message[] }) {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const messagesGroups = useMemo(() =>
		messages.reduce((groups: Message[][], message: Message) => {
			if (message.role === "user" || groups.length === 0) {
				groups.push([]);
			}
			groups[groups.length - 1]!.push(message);
			return groups;
		}, [] as Message[][])
		, [messages])

	useEffect(() => {
		const lastMessage: Message | undefined = messages[messages.length - 1];

		if (lastMessage?.role === 'user') {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);


	return (
		<div className={styles.Chat}>
			{[WELCOME_MESSAGE_GROUP, ...messagesGroups].map(
				(messages: Message[], groupIndex: number) => (
					// Group
					<div key={groupIndex} className={styles.Group}>
						{messages.map(({ role, content }: Message, index: number) => (
							// Message
							<div key={index} className={styles.Message} data-role={role}>
								<Markdown>{content}</Markdown>
							</div>
						))}
					</div>
				)
			)}

			<div ref={messagesEndRef} />
		</div>
	);
}