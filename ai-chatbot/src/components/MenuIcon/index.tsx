import styles from './MenuIcon.module.css';

interface MenuIconProps {
    onClick: () => void;
}

export function MenuIcon({ onClick }: MenuIconProps) {
    return (
        <button className={styles.MenuButton} onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
}