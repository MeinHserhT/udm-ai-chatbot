import React, { useEffect, useRef, useMemo } from 'react';
import Markdown from 'react-markdown';
import styles from './Chat.module.css';
import type { Message } from '../../types/messages';

const WELCOME_MESSAGE_GROUP: Message[] = [
	{
		role: 'model',
		content: 'Hello! How can I assist you today?',
	},
];

interface ChatProps {
	messages: Message[];
}

export const Chat: React.FC<ChatProps> = ({ messages }) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const messagesGroups = useMemo(() => {
		return messages.reduce<Message[][]>((groups, message) => {
			if (message.role === 'user' || groups.length === 0) {
				groups.push([]);
			}
			groups[groups.length - 1].push(message);
			return groups;
		}, []);
	}, [messages]);

	useEffect(() => {
		const lastMessage = messages[messages.length - 1];
		if (lastMessage?.role === 'user') {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	return (
		<div className={styles.Chat}>
			{[WELCOME_MESSAGE_GROUP, ...messagesGroups].map((group, groupIndex) => (
				<div key={`group-${groupIndex}`} className={styles.Group}>
					{group.map((msg, index) => (
						<div key={`msg-${index}`} className={styles.Message} data-role={msg.role}>
							<Markdown>{msg.content}</Markdown>
						</div>
					))}
				</div>
			))}
			<div ref={messagesEndRef} />
		</div>
	);
};