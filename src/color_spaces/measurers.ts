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
import { ciede2000 } from "./ciede2000";
import { cmc } from "./cmc";

type MEASURER = (pivot: string) => (target: string) => number;

export const MEASURERS = {
  ciede2000,
  cie94,
  cmc,
  lab: euclideanDistance(d3Lab, ["l", "a", "b"]),
  redmean: (pivot) => (target) => redmean(pivot, target),
  rgb: euclideanDistance(d3Rgb, ["r", "g", "b"]),
  lch: euclideanDistance(d3Lch, ["l", "c", "h"], { part: "h", max: 360 }),
  hsl: euclideanDistance(d3Hsl, ["h", "s", "l"], { part: "h", max: 360 }),
  cubehelix: euclideanDistance(d3Cubehelix, ["h", "s", "l"]),
} as const satisfies Readonly<Record<string, MEASURER>>;
