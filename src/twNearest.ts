import { map, pipe, sortBy, toPairs } from "remeda";
import { CIELAB, asLAB } from "./cielab";
import { asCIEXYZ } from "./ciexyz";
import { distance } from "./distance";
import { asSRGB } from "./rgb";
import { TAILWIND_COLORS, TailwindColor } from "./tailwindColors";

export function twNearest(target: string): readonly TailwindColor[] {
  const targetLab = hexStringToCIELAB(target);
  return pipe(
    TAILWIND_COLORS,
    toPairs.strict,
    sortBy(([value]) => distance(targetLab, hexStringToCIELAB(value))),
    ($) => $,
    map(([, twColor]) => twColor),
  );
}

const hexStringToCIELAB = (hex: string): CIELAB => asLAB(asCIEXYZ(asSRGB(hex)));
