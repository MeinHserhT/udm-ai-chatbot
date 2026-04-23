import { useState, useRef, useEffect } from 'react';
import styles from './Controls.module.css';
import TextareaAutosize from "react-textarea-autosize";

export function Controls({ isDisabled = false, onSend }: { isDisabled: boolean, onSend: (content: string) => void }) {
    const textAreaRef = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!isDisabled) {
            textAreaRef.current?.focus();
        }
    }, [isDisabled])

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
                <TextareaAutosize className={styles.TextArea}
                    ref={textAreaRef}
                    placeholder="Type a message..."
                    value={content}
                    minRows={1}
                    maxRows={4}
                    disabled={isDisabled}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress} />
            </div>
            <button className={styles.Button}
                disabled={isDisabled}
                onClick={handleContentSend}>
                <img src='./send.png' />
            </button>
        </div>
    );
}