import styles from "./styles.module.css";

export default function Slider({
  quality,
  handleSlider,
}: {
  quality: string;
  handleSlider: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        onChange={handleSlider}
      />
      <label htmlFor='quality'>{`${quality}%`}</label>
    </div>
  );
}
