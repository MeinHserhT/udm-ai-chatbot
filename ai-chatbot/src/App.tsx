import styles from './App.module.css';
import { useChat } from './hooks/useChat';
import { Navbar } from './components/Navbar';
import { ChatWindow } from './components/ChatWindow';

function App() {
  const { messages, isLoading, isStreaming, sendMessage, clearChat, assistantId, setAssistantId } = useChat();

  return (
    <div className={styles.App}>
      <Navbar clearChat={clearChat} assistantId={assistantId} setAssistantId={setAssistantId} />
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
