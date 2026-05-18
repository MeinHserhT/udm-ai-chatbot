import React from 'react';
import styles from './MenuIcon.module.css';

interface MenuIconProps {
    onClick: () => void;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ onClick }) => {
    return (
        <button type="button" className={styles.MenuButton} onClick={onClick} aria-label="Toggle Menu">
            <span />
            <span />
            <span />
        </button>
    );
};