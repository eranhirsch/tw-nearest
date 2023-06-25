import { toPairs } from "remeda";
import { TAILWIND_COLORS_RAW } from "./tailwindColorsRaw";

type ColorName = keyof typeof TAILWIND_COLORS_RAW;
type ColorShade =
  keyof (typeof TAILWIND_COLORS_RAW)[keyof typeof TAILWIND_COLORS_RAW];

export type TailwindColor = [color: ColorName, shade?: ColorShade];

export const TAILWIND_COLORS = normalizedTailwindColors(TAILWIND_COLORS_RAW);

function normalizedTailwindColors(
  raw: typeof TAILWIND_COLORS_RAW,
): Readonly<Record<string, TailwindColor>> {
  const out: Record<string, TailwindColor> = {};
  for (const [colorName, valueOrShades] of toPairs.strict(raw)) {
    if (typeof valueOrShades === "string") {
      out[valueOrShades] = [colorName];
    } else {
      for (const [shade, value] of toPairs.strict(valueOrShades)) {
        out[value] = [colorName, Number.parseInt(shade) as ColorShade];
      }
    }
  }
  return out;
}
