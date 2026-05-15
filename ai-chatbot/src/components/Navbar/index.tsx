
import { useState } from 'react';
import styles from './Navbar.module.css';
import { MenuIcon } from '../MenuIcon';
import type { AssistantId } from '../../types/assistants';
import { assistants } from '../../assistants/types';

interface NavbarProps {
  clearChat: () => void;
  assistantId: AssistantId;
  setAssistantId: (id: AssistantId) => void;
}

export function Navbar({ clearChat, assistantId, setAssistantId }: NavbarProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function toggleNav() {
    setIsNavCollapsed(prevState => !prevState);
  }

  function handleAssistantChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setAssistantId(event.target.value as AssistantId);
  }

  return (
    <div className={`${styles.Navbar} ${isNavCollapsed ? styles.NavbarCollapsed : ''}`}>
      <MenuIcon onClick={toggleNav} />
      <img className={styles.Logo} src="/logo.png" alt="Logo" />
      <div className={styles.Setting}>
        <button onClick={clearChat}>
          <img src="/plus.png" alt="New chat" />
          <p>New Chat</p>
        </button>
        <button type="button" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
          <img src="/settings.png" alt="Settings" />
          <p>Settings</p>
        </button>
      </div>
      {isSettingsOpen && (
        <div className={styles.SettingsDialog}>
          <select value={assistantId} onChange={handleAssistantChange}>
            {assistants.map(assistant => (
              <option key={assistant.id} value={assistant.id}>
                {assistant.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
