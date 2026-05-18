import React, { useState, useRef, useEffect, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Controls.module.css';

interface ControlsProps {
    isDisabled?: boolean;
    onSend: (content: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({ isDisabled = false, onSend }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (!isDisabled) {
            textAreaRef.current?.focus();
        }
    }, [isDisabled]);

    const handleContentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }, []);

    const handleContentSend = useCallback(() => {
        const trimmedContent = content.trim();
        if (trimmedContent.length > 0) {
            onSend(trimmedContent);
            setContent('');
        }
    }, [content, onSend]);

    const handleEnterPress = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleContentSend();
            }
        },
        [handleContentSend]
    );

    return (
        <div className={styles.Controls}>
            <div className={styles.TextAreaContainer}>
                <TextareaAutosize
                    className={styles.TextArea}
                    ref={textAreaRef}
                    placeholder="Type a message..."
                    value={content}
                    minRows={1}
                    maxRows={4}
                    disabled={isDisabled}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress}
                />
            </div>
            <button
                type="button"
                className={styles.Button}
                disabled={isDisabled || content.trim().length === 0}
                onClick={handleContentSend}
                aria-label="Send message"
            >
                <img src="/send.png" alt="Send" />
            </button>
        </div>
    );
};