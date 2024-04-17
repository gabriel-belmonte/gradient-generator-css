import type { JSX } from "preact/jsx-runtime";
import styles from "./styles.module.css";

export default function Slider({
  quality,
  handleSlider,
}: {
  quality: string;
  handleSlider: (event: JSX.TargetedInputEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.slider}>
      <span>Quality</span>
      <input
        type='range'
        id='quality'
        name='quality'
        min='0'
        max='100'
        value={quality}
        onInput={handleSlider}
      />
      <label htmlFor='quality'>{`${quality}%`}</label>
    </div>
  );
}
