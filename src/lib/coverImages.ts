import type { ImageMetadata } from 'astro';
import ontarioBoardAgm from '../assets/images/ontario-board-agm.png';

export const coverImages: Record<string, ImageMetadata> = {
  'ontario-board-agm.png': ontarioBoardAgm,
};

export function resolveCoverImage(filename?: string): ImageMetadata | undefined {
  if (!filename) return undefined;
  return coverImages[filename];
}
