import { ResolutionType } from "./types";

export const GRADIENT_PARAM_ID = "gradient";

export const DEFAULT_GRADIENT =
  "linear-gradient(to bottom, #aa151b 25%, #f1bf00 25%, #f1bf00 75%, rgba(170, 21, 27, .8) 75%)";

export const RESOLUTION: ResolutionType = {
  "1080p": {
    width: 1920,
    height: 1080,
  },
  "720p": {
    width: 1280,
    height: 720,
  },
};

export const sanitizeInput = (value: string) => value.replace(";", "");

export const getImageConfig = (
  input: string,
  resMode: keyof ResolutionType
): {
  style: { background: string };
  width: number;
  height: number;
} => {
  return {
    style: { background: input },
    ...RESOLUTION[resMode],
  };
};

export const getGradientFromUrl = (): string | null => {
  const url = new URL(window.location.href);
  return url.searchParams.get(GRADIENT_PARAM_ID);
};
