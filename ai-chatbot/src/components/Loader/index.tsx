import styles from "./Loader.module.css"

export function Loader() {
    return (
        <div className={styles.LoaderWrapper}>
            <div className={styles.TypingIndicator}>
                <span className={styles.Dot}></span>
                <span className={styles.Dot}></span>
                <span className={styles.Dot}></span>
            </div>
        </div>
    )
}