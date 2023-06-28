import { lab as d3Lab } from "d3-color";

const KL = 1;
const K1 = 0.045;
const K2 = 0.015;

/**
 * Copied from d3-color-difference, I didn't double check if this is correct or
 * not.
 *
 * @see https://github.com/Evercoder/d3-color-difference/blob/master/src/cie94.js
 */
export function cie94(pivot: string) {
  const std = d3Lab(pivot);
  const cStd = Math.pow(Math.pow(std.a, 2) + Math.pow(std.b, 2), 0.5);

  return (target: string) => {
    const smp = d3Lab(target);

    const cSmp = Math.pow(Math.pow(smp.a, 2) + Math.pow(smp.b, 2), 0.5);

    const dl2 = Math.pow(std.l - smp.l, 2);
    const dC2 = Math.pow(cStd - cSmp, 2);
    const dH2 = Math.pow(std.a - smp.a, 2) + Math.pow(std.b - smp.b, 2) - dC2;

    return Math.pow(
      dl2 / Math.pow(KL, 2) +
        dC2 / Math.pow(1 + K1 * cStd, 2) +
        dH2 / Math.pow(1 + K2 * cStd, 2),
      0.5,
    );
  };
}
