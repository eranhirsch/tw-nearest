import { toPairs } from "remeda";
import { color as d3Color } from "d3-color";
import invariant from "tiny-invariant";

type NormalizedColor<Shade extends number, T extends Colors<Shade>> = readonly [
  color: keyof T,
  shade?: Shade,
];

type Colors<Shade extends number> = Readonly<
  Record<string, string | Shaded<Shade>>
>;
type Shaded<Shade extends number> = Readonly<Record<Shade, string>>;

type NamedColors<Shade extends number, T extends Colors<Shade>> = Record<
  string,
  readonly [NormalizedColor<Shade, T>, ...NormalizedColor<Shade, T>[]]
>;

export function normalizedColors<Shade extends number, T extends Colors<Shade>>(
  raw: T,
): Readonly<NamedColors<Shade, T>> {
  const out: NamedColors<Shade, T> = {};

  for (const [colorName, valueOrShades] of toPairs.strict(raw)) {
    if (typeof valueOrShades === "string") {
      const normalized = normalizedColor(valueOrShades);
      out[normalized] = [...(out[normalized] ?? []), [colorName]];
    } else {
      for (const [shade, value] of toPairs.strict(valueOrShades)) {
        const normalized = normalizedColor(value as string);
        out[normalized] = [
          ...(out[normalized] ?? []),
          [colorName, asShade<Shade>(shade)],
        ];
      }
    }
  }

  return out;
}

function normalizedColor(raw: string): string {
  const color = d3Color(raw);
  invariant(color !== null, `Invalid color: ${raw}`);
  return color.formatHex();
}

const asShade = <Shade extends number>(x: string): Shade =>
  Number.parseInt(x) as Shade;
