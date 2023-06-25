import { mapValues } from "remeda";
import { CIEXYZ } from "./ciexyz";

export type CIELAB = Readonly<Record<"l" | "a" | "b", number>>;

// @see https://en.wikipedia.org/wiki/Illuminant_D65#Definition
const STANDARD_ILLUMINANT_D65 = {
  x: 0.950_47,
  y: 1,
  z: 1.088_83,
} as const satisfies Readonly<Record<keyof CIEXYZ, number>>;

const DELTA = 6 / 29;

/**
 * Convert a color in CIE XYZ color space to CIE LAB color space.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIEXYZ_to_CIELAB
 */
export function asLAB(input: CIEXYZ): CIELAB {
  const { x, y, z } = mapValues(
    input,
    (value, key) => value / STANDARD_ILLUMINANT_D65[key],
  );

  const l = 116 * f(y) - 16;
  const a = 500 * (f(x) - f(y));
  const b = 200 * (f(y) - f(z));

  // Return the CIELAB color
  return { l, a, b };
}

const f = (t: number): number =>
  t > DELTA ** 3 ? t ** (1 / 3) : t / (3 * DELTA ** 2) + 4 / 29;
