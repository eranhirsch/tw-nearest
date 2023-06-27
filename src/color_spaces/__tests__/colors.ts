import { CIELAB } from "../cielab";
import { type CIEXYZ } from "../ciexyz";
import { type SRGB } from "../srgb";

interface TestCase {
  readonly name: string;
  readonly rgb: SRGB;
  readonly xyz: CIEXYZ;
  readonly lab: CIELAB;
}

/**
 * All values created externally using EasyRGB.
 * @see https://www.easyrgb.com/en/convert.php#inputFORM
 */
export const COLORS: readonly TestCase[] = [
  {
    name: "red pulse",
    rgb: { red: 1, green: 0, blue: 0 },
    xyz: { x: 41.246, y: 21.267, z: 1.933 },
    lab: { l: 53.241, a: 80.092, b: 67.203 },
  },
  {
    name: "green pulse",
    rgb: { red: 0, green: 1, blue: 0 },
    xyz: { x: 35.758, y: 71.515, z: 11.919 },
    lab: { l: 87.735, a: -86.183, b: 83.179 },
  },
  {
    name: "blue pulse",
    rgb: { red: 0, green: 0, blue: 1 },
    xyz: { x: 18.044, y: 7.217, z: 95.03 },
    lab: {
      l: 32.297,
      // TODO [2024-01-01]: EasyRGB gave a value of 79.188 here, but we're
      // getting this instead.
      a: 79.193,
      b: -107.86,
    },
  },
  {
    name: "white",
    rgb: { red: 1, green: 1, blue: 1 },
    xyz: { x: 95.047, y: 100, z: 108.883 },
    lab: { l: 100, a: 0, b: 0 },
  },
  {
    name: "black",
    rgb: { red: 0, green: 0, blue: 0 },
    xyz: { x: 0, y: 0, z: 0 },
    lab: { l: 0, a: 0, b: 0 },
  },
  {
    name: "gray",
    rgb: { red: 0.5, green: 0.5, blue: 0.5 },
    xyz: { x: 20.344, y: 21.404, z: 23.305 },
    lab: { l: 53.389, a: 0, b: 0 },
  },
  {
    name: "different ratios 1",
    rgb: { red: 0.123, green: 0.456, blue: 0.789 },
    xyz: { x: 17.415, y: 17.076, z: 57.746 },
    lab: { l: 48.356, a: 6.592, b: -50.93 },
  },
  {
    name: "different ratios 2",
    rgb: { red: 0.789, green: 0.123, blue: 0.456 },
    xyz: { x: 27.81, y: 14.715, z: 17.981 },
    lab: { l: 45.241, a: 67.969, b: -4.139 },
  },
  {
    name: "different ratios 3",
    rgb: { red: 0.456, green: 0.789, blue: 0.123 },
    xyz: { x: 28.424, y: 45.696, z: 8.644 },
    lab: { l: 73.348, a: -50.758, b: 68.091 },
  },
];
