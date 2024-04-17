import type { JSX } from "preact/jsx-runtime";
import { useCallback, useRef, useState } from "preact/hooks";
import { toPng } from "html-to-image";
import {
  DEFAULT_GRADIENT,
  DEFAULT_QUALITY,
  getImageConfig,
  sanitizeInput,
} from "./utils";
import type { ResolutionType } from "./types";
import "./App.css";
import Slider from "./components/Slider/Slider.tsx";
import Preview from "./components/Preview/Preview.tsx";

function App() {
  const [gradient, setGradient] = useState(DEFAULT_GRADIENT);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);

  const ref = useRef(null);

  const handleClick = useCallback(
    (resMode: keyof ResolutionType) => {
      if (ref.current === null) {
        return;
      }

      toPng(ref.current, getImageConfig(gradient, resMode, quality))
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `gradient-image-${resMode}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [ref, gradient, quality]
  );

  const handleTextArea = useCallback(
    (event: JSX.TargetedInputEvent<HTMLTextAreaElement>) => {
      setGradient(sanitizeInput(event.currentTarget.value));
    },
    []
  );

  const handleSlider = useCallback(
    (event: JSX.TargetedInputEvent<HTMLInputElement>) => {
      setQuality(event.currentTarget.value);
    },
    []
  );

  return (
    <div className='container'>
      <div className='buttons'>
        <button onClick={() => handleClick("1080p")}>DOWNLOAD 1080p</button>
        <button onClick={() => handleClick("720p")}>DOWNLOAD 720p</button>
        <Slider quality={quality} handleSlider={handleSlider} />
      </div>
      <Preview gradient={gradient} />
      <textarea
        className='text'
        autoFocus
        onChange={handleTextArea}
        value={gradient}
      />
      <div ref={ref} />
    </div>
  );
}

export default App;
