import { rgb as d3Rgb } from "d3-color";

/**
 * @see https://en.wikipedia.org/wiki/Color_difference#sRGB
 */
export function redmean(aRaw: string, bRaw: string): number {
  const a = d3Rgb(aRaw);
  const b = d3Rgb(bRaw);

  const rRoof = (a.r + b.r) / 2;

  return Math.pow(
    (2 + rRoof / 256) * Math.pow(a.r - b.r, 2) +
      4 * Math.pow(a.g - b.g, 2) +
      (2 + (255 - rRoof) / 256) * Math.pow(a.b - b.b, 2),
    0.5,
  );
}
