import {
  lab as d3Lab,
  rgb as d3Rgb,
  lch as d3Lch,
  hsl as d3Hsl,
  cubehelix as d3Cubehelix,
} from "d3-color";
import { euclideanDistance } from "../utils/euclideanDistance";
import { redmean } from "./redmean";
import { cie94 } from "./cie94";

type MEASURER = (pivot: string) => (target: string) => number;

export const KL = 1;
export const K1 = 0.045;
export const K2 = 0.015;

export const MEASURERS = {
  cie94,
  lab: euclideanDistance(d3Lab, ["l", "a", "b"]),
  redmean: (pivot) => (target) => redmean(pivot, target),
  rgb: euclideanDistance(d3Rgb, ["r", "g", "b"]),
  lch: euclideanDistance(d3Lch, ["l", "c", "h"], { part: "h", max: 360 }),
  hsl: euclideanDistance(normalizedHsl, ["h", "s", "l"], { part: "h", max: 1 }),
  cubehelix: euclideanDistance(d3Cubehelix, ["h", "s", "l"]),
} as const satisfies Readonly<Record<string, MEASURER>>;

function normalizedHsl(color: string) {
  const { h, ...rest } = d3Hsl(color);
  return { h: h / 360, ...rest };
}
