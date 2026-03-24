import { useState } from 'react';
import styles from './Controls.module.css';

export function Controls({ onSend }: { onSend: (content: string) => void }) {
    const [content, setContent] = useState('');

    function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    function handleContentSend() {
        if (content.length > 0) {
            onSend(content);
            setContent('');
        }
    }

    function handleEnterPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleContentSend();
        }
    }

    return (
        <div className={styles.Controls}>
            <div className={styles.TextAreaContainer}>
                <textarea className={styles.TextArea}
                    placeholder="Type a message..."
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress} />
            </div>
            <button className={styles.Button}
                onClick={handleContentSend}>
                <img src='./send.png' />
            </button>
        </div>
    );
}