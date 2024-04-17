import { Options } from "html-to-image/lib/types";
import { ResolutionType } from "./types";

export const DEFAULT_QUALITY = "95";

export const DEFAULT_GRADIENT =
  "linear-gradient(0deg, rgba(0, 0, 0, .7) 20%, rgba(220, 0, 0, .5) 50%),\nlinear-gradient(180deg, rgba(0, 220, 0, .7) 20%, rgba(0, 0, 0, .5) 50%)";

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
  resMode: keyof ResolutionType,
  quality: string
): Options => {
  return {
    quality: Number(quality) / 100,
    style: { background: input },
    ...RESOLUTION[resMode],
  };
};
