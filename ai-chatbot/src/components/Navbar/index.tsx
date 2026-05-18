import React, { useState, useCallback } from 'react';
import { MenuIcon } from '../MenuIcon';
import { assistants } from '../../assistants/types';
import type { AssistantId } from '../../types/assistants';
import styles from './Navbar.module.css';

interface NavbarProps {
  clearChat: () => void;
  assistantId: AssistantId;
  setAssistantId: (id: AssistantId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ clearChat, assistantId, setAssistantId }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const toggleNav = useCallback(() => {
    setIsNavCollapsed((prev) => !prev);
  }, []);

  const toggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  const handleAssistantChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setAssistantId(event.target.value as AssistantId);
    },
    [setAssistantId]
  );

  return (
    <nav className={`${styles.Navbar} ${isNavCollapsed ? styles.NavbarCollapsed : ''}`}>
      <MenuIcon onClick={toggleNav} />
      <img className={styles.Logo} src="/logo.png" alt="Logo" />
      <div className={styles.Setting}>
        <button type="button" onClick={clearChat}>
          <img src="/plus.png" alt="New chat" />
          <p>New Chat</p>
        </button>
        <button type="button" onClick={toggleSettings}>
          <img src="/settings.png" alt="Settings" />
          <p>Settings</p>
        </button>
      </div>
      {isSettingsOpen && (
        <div className={styles.SettingsDialog}>
          <select value={assistantId} onChange={handleAssistantChange}>
            {assistants.map((assistant) => (
              <option key={assistant.id} value={assistant.id}>
                {assistant.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};