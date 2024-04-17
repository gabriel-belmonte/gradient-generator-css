import { ChangeEvent, useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  DEFAULT_GRADIENT,
  DEFAULT_QUALITY,
  getImageConfig,
  sanitizeInput,
} from "./utils";
import type { ResolutionType } from "./types";
import "./App.css";
import Slider from "./components/Slider.tsx";

function App() {
  const [input, setInput] = useState(DEFAULT_GRADIENT);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);

  const ref = useRef(null);

  const handleClick = useCallback(
    (resMode: keyof ResolutionType) => {
      if (ref.current === null) {
        return;
      }

      toPng(ref.current, getImageConfig(input, resMode, quality))
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "gradient-image.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [ref, input, quality]
  );

  const handleTextArea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(sanitizeInput(event.target.value));
    },
    []
  );

  const handleSlider = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuality(event.target.value);
  }, []);

  return (
    <div className='container'>
      <div className='buttons'>
        <button onClick={() => handleClick("1080p")}>DOWNLOAD 1080p</button>
        <button onClick={() => handleClick("720p")}>DOWNLOAD 720p</button>
        <Slider quality={quality} handleSlider={handleSlider} />
      </div>
      <div className='preview-box'>
        <div className='background' />
        <div className='gradient' style={{ background: input }} />
      </div>
      <textarea
        className='text'
        autoFocus
        onChange={handleTextArea}
        value={input}
      />
      <div ref={ref} />
    </div>
  );
}

export default App;
