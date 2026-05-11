import styles from './App.module.css';
import { useChat } from './hooks/useChat';
import { Navbar } from './components/Navbar/Navbar';
import { ChatWindow } from './components/ChatWindow/ChatWindow';

function App() {
  const { messages, isLoading, isStreaming, sendMessage, clearChat } = useChat();

  return (
    <div className={styles.App}>
      <Navbar clearChat={clearChat} />
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        isStreaming={isStreaming}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default App;
