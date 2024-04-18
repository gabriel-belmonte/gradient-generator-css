import type { ResolutionType } from "../../types";
import styles from "./styles.module.css";

export default function Buttons({
  handleClick,
}: {
  handleClick: (resMode: keyof ResolutionType) => void;
}) {
  return (
    <div className={styles.buttons}>
      <button onClick={() => handleClick("1080p")}>DOWNLOAD 1080p</button>
      <button onClick={() => handleClick("720p")}>DOWNLOAD 720p</button>
    </div>
  );
}
