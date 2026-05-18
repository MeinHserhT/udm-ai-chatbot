import React from 'react';
import Markdown from 'react-markdown';
import styles from './Start.module.css';

const WELCOME_MESSAGE = "Hello, I'm Gemini. I'm a large language model, trained by Google. How can I help you today?";

const PROMPTS = [
    "Give me a beginner's guide to quantum computing",
    "Write a poem about the beauty of the cosmos",
    "Explain the difference between a virus and a bacterium",
    "What are some tips for learning a new language?",
];

interface StartProps {
    onPromptClick: (prompt: string) => void;
}

export const Start: React.FC<StartProps> = ({ onPromptClick }) => {
    return (
        <div className={styles.Start}>
            <div className={styles.Welcome}>
                <Markdown>{WELCOME_MESSAGE}</Markdown>
            </div>
            <div className={styles.Prompts}>
                {PROMPTS.map((prompt) => (
                    <button
                        key={prompt}
                        type="button"
                        className={styles.Prompt}
                        onClick={() => onPromptClick(prompt)}
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
};