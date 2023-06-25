import { toPairs } from "remeda";

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

function normalizedColor(color: string): string {
  if (!color.startsWith("#")) {
    // We don't know what this is...
    return color;
  }

  if (color.length === 7) {
    // regular 6 digit color
    return color;
  }

  if (color.length !== 4) {
    // We don't know what this is...
    return color;
  }

  const [r, g, b] = color.slice(1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- We assert the lenght, there's no way to tell typescript this is safe without redundant undefined checks...
  return `#${r!}${r!}${g!}${g!}${b!}${b!}`;
}

function asShade<Shade extends number>(x: string): Shade {
  return Number.parseInt(x) as Shade;
}
