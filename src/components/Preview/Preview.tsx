import styles from "./styles.module.css";

export default function Preview({ gradient }: { gradient: string }) {
  return (
    <div className={styles.preview}>
      <div className={styles.background} />
      <div className={styles.gradient} style={{ background: gradient }} />
    </div>
  );
}
