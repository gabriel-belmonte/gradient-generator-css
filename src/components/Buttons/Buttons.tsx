import type { JSX } from "preact/jsx-runtime";
import type { ResolutionType } from "../../types";
import Slider from "../Slider/Slider";
import styles from "./styles.module.css";

export default function Buttons({
  quality,
  handleClick,
  handleSlider,
}: {
  quality: string;
  handleClick: (resMode: keyof ResolutionType) => void;
  handleSlider: (event: JSX.TargetedInputEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.buttons}>
      <button onClick={() => handleClick("1080p")}>DOWNLOAD 1080p</button>
      <button onClick={() => handleClick("720p")}>DOWNLOAD 720p</button>
      <Slider quality={quality} handleSlider={handleSlider} />
    </div>
  );
}
