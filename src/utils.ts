import { Options } from 'html-to-image/lib/types';
import { ResolutionType } from './types';

export const DEFAULT_QUALITY = '95';

export const DEFAULT_GRADIENT =
  'linear-gradient(0deg, purple 20%, #0000ff03 50%), linear-gradient(180deg, green 20%, red 50%)';

export const RESOLUTION: ResolutionType = {
  '1080p': {
    width: 1920,
    height: 1080,
  },
  '720p': {
    width: 1280,
    height: 720,
  },
};

const sanitizeInput = (value: string) => {
  return value.replace(';', '');
};

export const getImageConfig = (
  input: string,
  resMode: keyof ResolutionType,
  quality: string
): Options => {
  return {
    quality: Number(quality) / 100,
    style: { background: sanitizeInput(input) },
    ...RESOLUTION[resMode],
  };
};
