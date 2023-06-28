import {
  lab as d3Lab,
  rgb as d3Rgb,
  hcl as d3Hcl,
  hsl as d3Hsl,
  cubehelix as d3Cubehelix,
} from "d3-color";
import { euclideanDistance } from "../utils/euclideanDistance";
import { redmean } from "../utils/redmean";

type MEASURER = (pivot: string) => (target: string) => number;

export const MEASURERS = {
  lab: euclideanDistance(d3Lab, ["l", "a", "b"]),
  hcl: euclideanDistance(d3Hcl, ["h", "c", "l"]),
  redmean: (pivot) => (target) => redmean(pivot, target),
  hsl: euclideanDistance(d3Hsl, ["h", "s", "l"]),
  rgb: euclideanDistance(d3Rgb, ["r", "g", "b"]),
  cubehelix: euclideanDistance(d3Cubehelix, ["h", "s", "l"]),
} as const satisfies Readonly<Record<string, MEASURER>>;
