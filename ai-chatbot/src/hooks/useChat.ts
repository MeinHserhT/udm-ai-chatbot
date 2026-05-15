import { useState } from 'react';
import { createAssistant } from '../assistants/factory';
import type { Message } from '../types/messages';
import type { AssistantId } from '../types/assistants';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [assistantId, setAssistantId] = useState<AssistantId>('gemini');

  const assistant = createAssistant(assistantId);

  const clearChat = () => setMessages([]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { content, role: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      await streamMessage(content);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        content: "Sorry, I'm having trouble right now. Please try again later.",
        role: 'model',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const streamMessage = async (content: string) => {
    setIsStreaming(true);
    setMessages((prevMessages) => [...prevMessages, { content: '', role: 'model' }]);

    const stream = assistant.chatStream(content);
    for await (const chunk of stream) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage) {
          newMessages[newMessages.length - 1] = { ...lastMessage, content: lastMessage.content + chunk };
        }
        return newMessages;
      });
    }
    setIsStreaming(false);
  };

  return { messages, isLoading, isStreaming, sendMessage, clearChat, assistantId, setAssistantId };
}
