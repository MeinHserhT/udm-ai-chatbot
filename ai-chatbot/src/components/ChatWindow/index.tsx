import React from 'react';
import { Chat } from '../Chat';
import { Start } from '../Start';
import { Controls } from '../Controls';
import { Loader } from '../Loader';
import type { Message } from '../../types/messages';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  sendMessage: (content: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  isStreaming,
  sendMessage,
}) => {
  return (
    <main className={styles.Main}>
      {isLoading && <Loader />}
      <div className={styles.ChatContainer}>
        {messages.length === 0 ? (
          <Start onPromptClick={sendMessage} />
        ) : (
          <Chat messages={messages} />
        )}
      </div>
      <Controls isDisabled={isLoading || isStreaming} onSend={sendMessage} />
    </main>
  );
};