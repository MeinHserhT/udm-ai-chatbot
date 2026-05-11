import { useState } from 'react';
import type { Message } from '../components/Message';
import { Assistant } from '../assistants/Gemini';

const assistant = new Assistant();

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const clearChat = () => setMessages([]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { content, role: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const result = await assistant.chatStream(content);
      let isFirstChunk = true;

      for await (const chunk of result) {
        if (isFirstChunk) {
          isFirstChunk = false;
          setMessages((prevMessages) => [...prevMessages, { content: '', role: 'model' }]);
          setIsLoading(false);
          setIsStreaming(true);
        }
        if (chunk) {
          setMessages((prevMessages) =>
            prevMessages.map((msg, i) =>
              i === prevMessages.length - 1 ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        content: 'Sorry, I\'m having trouble right now. Please try again later.',
        role: 'model',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return { messages, isLoading, isStreaming, sendMessage, clearChat };
}
