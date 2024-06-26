import domtoimage from "dom-to-image-more";
import type { JSX } from "preact/jsx-runtime";
import { useCallback, useRef } from "preact/hooks";
import type { ResolutionType } from "./types";
import { getImageConfig } from "./utils";
import Preview from "./components/Preview/Preview.tsx";
import TextArea from "./components/TextArea/TextArea.tsx";
import Buttons from "./components/Buttons/Buttons.tsx";
import styles from "./styles.module.css";
import useGradient from "./components/hooks/useGradient.tsx";

function App() {
  const { gradient, setGradient, resetGradient, gradientToClipboard } =
    useGradient();

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (resMode: keyof ResolutionType) => {
      if (ref.current === null) {
        return;
      }

      domtoimage
        .toPng(ref.current, getImageConfig(gradient, resMode))
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.download = `gradient-image-${resMode}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err: string) => {
          console.log(err);
        });
    },
    [ref, gradient]
  );

  const handleTextArea = useCallback(
    (event: JSX.TargetedInputEvent<HTMLTextAreaElement>) => {
      setGradient(event.currentTarget.value);
    },
    []
  );

  return (
    <div className={styles.container}>
      <Buttons
        handleClick={handleClick}
        resetGradient={resetGradient}
        gradientToClipboard={gradientToClipboard}
      />
      <Preview gradient={gradient} />
      <TextArea gradient={gradient} handleTextArea={handleTextArea} />
      <div ref={ref} />
    </div>
  );
}

export default App;
