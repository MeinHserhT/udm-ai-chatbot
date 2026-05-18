import { useState, useCallback } from 'react';
import { createAssistant } from '../assistants/factory';
import type { Message } from '../types/messages';
import type { AssistantId } from '../types/assistants';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [assistantId, setAssistantId] = useState<AssistantId>('gemini');

  const clearChat = useCallback(() => setMessages([]), []);

  const streamMessage = useCallback(async (content: string, assistant: ReturnType<typeof createAssistant>) => {
    setIsStreaming(true);
    setMessages((prev) => [...prev, { content: '', role: 'model' }]);

    try {
      const stream = assistant.chatStream(content);
      for await (const chunk of stream) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          const lastMessage = newMessages[lastIndex];
          
          if (lastMessage) {
            newMessages[lastIndex] = { ...lastMessage, content: lastMessage.content + chunk };
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => [
        ...prev,
        { content: "Sorry, I'm having trouble right now. Please try again later.", role: 'model' },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = { content, role: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const assistant = createAssistant(assistantId);
        await streamMessage(content, assistant);
      } finally {
        setIsLoading(false);
      }
    },
    [assistantId, streamMessage]
  );

  return { 
    messages, 
    isLoading, 
    isStreaming, 
    sendMessage, 
    clearChat, 
    assistantId, 
    setAssistantId 
  };
};