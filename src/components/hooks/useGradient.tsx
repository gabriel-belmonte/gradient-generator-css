import { useCallback, useEffect, useState } from "preact/hooks";
import {
  DEFAULT_GRADIENT,
  GRADIENT_PARAM_ID,
  getGradientFromUrl,
  sanitizeInput,
} from "../../utils";

export default function useGradient() {
  const [gradient, setStateGradient] = useState("");

  const setGradient = (newGradient: string) => {
    setStateGradient(sanitizeInput(newGradient));
  };

  const resetGradient = () => {
    setStateGradient(DEFAULT_GRADIENT);
  };

  const gradientToClipboard = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.append(GRADIENT_PARAM_ID, gradient);
    navigator.clipboard.writeText(url.toString());
  }, [gradient]);

  useEffect(() => {
    if (gradient) {
      localStorage.setItem(GRADIENT_PARAM_ID, gradient);
    }
  }, [gradient]);

  useEffect(() => {
    const gradientFromUrl = getGradientFromUrl();
    const savedGradient = localStorage.getItem(GRADIENT_PARAM_ID);

    if (gradientFromUrl) {
      setGradient(gradientFromUrl);
    } else if (savedGradient) {
      setGradient(savedGradient);
    } else {
      resetGradient();
    }
  }, []);

  return {
    gradient,
    setGradient,
    gradientToClipboard,
    resetGradient,
  };
}
