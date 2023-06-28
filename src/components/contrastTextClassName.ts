import { lab as d3Lab } from "d3-color";

export function contrastTextClassName(color: string): string {
  const { l } = d3Lab(color);
  return l > 50 ? "text-neutral-950" : "text-neutral-50";
}
