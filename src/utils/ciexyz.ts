import { createPipe, mapValues, sumBy, toPairs } from "remeda";
import { SRGB } from "./srgb";

export type CIEXYZ = Readonly<Record<"x" | "y" | "z", number>>;

// Constants for RGB to XYZ conversion. These coefficients are derived from the
// CIE 1931 standard illuminant values for converting RGB to XYZ.
const COEFFICIENTS = {
  x: {
    red: 0.412_456_4,
    green: 0.357_576_1,
    blue: 0.180_437_5,
  },
  y: {
    red: 0.212_672_9,
    green: 0.715_152_2,
    blue: 0.072_175,
  },
  z: {
    red: 0.019_333_9,
    green: 0.119_192,
    blue: 0.950_304_1,
  },
} as const satisfies Readonly<
  Record<keyof CIEXYZ, Readonly<Record<keyof SRGB, number>>>
>;

/**
 * Converts an RGB color (in the sRGB color space) to its equivalent coordinate
 * in the CIE XYZ color space.
 * @see https://en.wikipedia.org/wiki/SRGB#From_sRGB_to_CIE_XYZ
 */
export const asCIEXYZ = (srgb: SRGB): CIEXYZ =>
  mapValues(
    COEFFICIENTS,
    createPipe(
      toPairs.strict,
      sumBy(([color, coefficient]) => asLinear(srgb[color]) * coefficient),
    ),
  );

const asLinear = (srgb: number): number =>
  srgb < 0.040_45 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
