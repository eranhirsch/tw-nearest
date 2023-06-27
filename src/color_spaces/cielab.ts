import { createPipe, mapValues, sumBy, values } from "remeda";
import { CIEXYZ, XYZ_COEFFICIENTS } from "./ciexyz";

export type CIELAB = Readonly<Record<"l" | "a" | "b", number>>;

// @see https://en.wikipedia.org/wiki/Illuminant_D65#Definition
const STANDARD_ILLUMINANT_D65 = mapValues(
  XYZ_COEFFICIENTS,
  createPipe(
    values,
    sumBy((coefficient) => coefficient * 100),
  ),
);

const DELTA = 6 / 29;
const PIVOT_POINT = DELTA ** 3;

const CUBE_ROOT = 1 / 3;

const SOMETHING = 1 / (3 * DELTA ** 2);
const ANOTHER_CONST = 4 / 29;

/**
 * Convert a color in CIE XYZ color space to CIE LAB color space.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIEXYZ_to_CIELAB
 */
export function asLAB(input: CIEXYZ): CIELAB {
  const { x, y, z } = mapValues(input, (value, key) =>
    f(value / STANDARD_ILLUMINANT_D65[key]),
  );

  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  // Return the CIELAB color
  return { l, a, b };
}

const f = (t: number): number =>
  t > PIVOT_POINT ? t ** CUBE_ROOT : t * SOMETHING + ANOTHER_CONST;
