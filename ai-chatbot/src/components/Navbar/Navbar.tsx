import { useState } from 'react';
import styles from './Navbar.module.css';
import { MenuIcon } from '../MenuIcon/MenuIcon';

interface NavbarProps {
  clearChat: () => void;
}

export function Navbar({ clearChat }: NavbarProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  function toggleNav() {
    setIsNavCollapsed(prevState => !prevState);
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
        <button type="button">
          <img src="/settings.png" alt="Settings" />
          <p>Settings</p>
        </button>
      </div>
    </div>
  );
}
