import { lab as d3Lab } from "d3-color";

const L = 1;
const C = 1;

/**
 * Copied from d3-color-difference, I didn't double check if this is correct or
 * not.
 *
 * @see https://github.com/Evercoder/d3-color-difference/blob/master/src/cmc.js
 */
export function cmc(pivot: string) {
  const std = d3Lab(pivot);
  const cStd = Math.pow(Math.pow(std.a, 2) + Math.pow(std.b, 2), 0.5);
  let hStd = Math.atan2(std.b, std.a);
  hStd = hStd < 0 ? hStd + 2 * Math.PI : 0;

  const Sl = std.l < 16 ? 0.511 : (0.040_975 * std.l) / (1 + 0.017_65 * std.l);

  return (target: string) => {
    const smp = d3Lab(target);
    const cSmp = Math.pow(Math.pow(smp.a, 2) + Math.pow(smp.b, 2), 0.5);

    const dL2 = Math.pow(std.l - smp.l, 2);
    const dC2 = Math.pow(cStd - cSmp, 2);
    const dH2 = Math.pow(std.a - smp.a, 2) + Math.pow(std.b - smp.b, 2) - dC2;

    const F = Math.pow(Math.pow(cStd, 4) / (Math.pow(cStd, 4) + 1900), 0.5);
    const T =
      hStd >= (164 / 180) * Math.PI && hStd <= (345 / 180) * Math.PI
        ? 0.56 + Math.abs(0.2 * Math.cos(hStd + (168 / 180) * Math.PI))
        : 0.36 + Math.abs(0.4 * Math.cos(hStd + (35 / 180) * Math.PI));

    const Sc = (0.0638 * cStd) / (1 + 0.0131 * cStd) + 0.638;
    const Sh = Sc * (F * T + 1 - F);

    return Math.pow(
      dL2 / Math.pow(L * Sl, 2) +
        dC2 / Math.pow(C * Sc, 2) +
        dH2 / Math.pow(Sh, 2),
      0.5,
    );
  };
}
