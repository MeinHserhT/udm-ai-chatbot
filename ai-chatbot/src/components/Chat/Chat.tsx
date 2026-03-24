import styles from "./Chat.module.css";

const WELCOME_MESSAGE: { role: string, content: string } = {
  role: "assistant",
  content: "Hello! How can I assist you today?",
};

export function Chat({ messages }: { messages: { role: string; content: string; }[] }) {
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }: { role: string, content: string }, index: number) => (
        <div key={index} className={styles.Message} data-role={role}>
          {content}
        </div>
      ))}
    </div>
  );
}