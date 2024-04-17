import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { DEFAULT_GRADIENT, DEFAULT_QUALITY, getImageConfig } from './utils';
import type { ResolutionType } from './types';
import './App.css';

function App() {
  const [input, setInput] = useState(DEFAULT_GRADIENT);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);

  const ref = useRef(null);

  const onClick = useCallback(
    (resMode: keyof ResolutionType) => {
      if (ref.current === null) {
        return;
      }

      toPng(ref.current, getImageConfig(input, resMode, quality))
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'gradient-image.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [ref, input, quality]
  );

  const onInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(event.target.value);
    },
    []
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuality(event.target.value);
  }, []);

  return (
    <div className="container">
      <div className="buttons">
        <button onClick={() => onClick('1080p')}>DOWNLOAD 1080p</button>
        <button onClick={() => onClick('720p')}>DOWNLOAD 720p</button>
        <div className="slider">
          <input
            type="range"
            id="quality"
            name="quality"
            min="0"
            max="100"
            value={quality}
            onChange={onChange}
          />
          <label htmlFor="quality">{`Quality -> ${quality}`}</label>
        </div>
      </div>
      <div className="preview" style={{ background: input }}></div>
      <textarea className="text" autoFocus onInput={onInput} value={input} />
      <div ref={ref} />
    </div>
  );
}

export default App;
