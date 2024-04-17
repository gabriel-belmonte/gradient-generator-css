import type { JSX } from "preact/jsx-runtime";
import styles from "./styles.module.css";

export default function TextArea({
  gradient,
  handleTextArea,
}: {
  gradient: string;
  handleTextArea: (event: JSX.TargetedInputEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      className={styles.text}
      autoFocus
      onInput={handleTextArea}
      value={gradient}
      spellCheck={false}
      aria-label='gradient-textarea'
    />
  );
}
