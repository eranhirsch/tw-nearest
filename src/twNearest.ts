import { map, pipe, prop, sortBy, toPairs } from "remeda";
import { TAILWIND_COLORS } from "./pallettes/tailwind";

export interface ScoredColor {
  readonly names: (typeof TAILWIND_COLORS)[keyof typeof TAILWIND_COLORS];
  readonly color: string;
  readonly distance: number;
}

export function twNearest(
  measurer: (target: string) => number,
): readonly ScoredColor[] {
  return pipe(
    TAILWIND_COLORS,
    toPairs.strict,
    map(([color, names]) => ({
      names,
      color,
      distance: measurer(color),
    })),
    sortBy(prop("distance")),
  );
}
