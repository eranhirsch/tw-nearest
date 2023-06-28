import { lab as d3Lab } from "d3-color";
import { KL, K1, K2 } from "./measurers";

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
