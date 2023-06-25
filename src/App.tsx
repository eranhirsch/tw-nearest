import { useMemo, useState } from "react";
import { twNearest } from "./twNearest";
import { asLAB } from "./color_spaces/cielab";
import { asCIEXYZ } from "./color_spaces/ciexyz";
import { asSRGB } from "./color_spaces/srgb";

export function App() {
  const [color, setColor] = useState<string>();

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full items-center justify-evenly gap-20 overflow-hidden p-20">
        <ColorSelector onChange={setColor} />
        {color !== undefined && <Results color={color} />}
      </main>
    </div>
  );
}

function ColorSelector({
  onChange,
}: {
  readonly onChange: (value: string) => void;
}): JSX.Element {
  return (
    <form>
      <label className="flex items-center gap-2">
        Color:{" "}
        <input
          type="color"
          onChange={({ currentTarget: { value } }) => {
            onChange(value);
          }}
        />
      </label>
    </form>
  );
}

function Results({ color }: { readonly color: string }): JSX.Element {
  const closest = useMemo(() => twNearest(color), [color]);

  return (
    <ol className="flex h-full flex-wrap items-center justify-center gap-3 overflow-hidden overflow-y-auto p-1">
      {closest.map(({ color, names }) => (
        <>
          {names.length > 1 ? (
            <>
              {names.map(([colorName, shade]) => (
                <li key={colorName}>
                  <Color colorName={colorName} shade={shade} color={color} />
                </li>
              ))}
            </>
          ) : (
            <li key={color}>
              <Color
                colorName={names[0][0]}
                shade={names[0][1]}
                color={color}
              />
            </li>
          )}
        </>
      ))}
    </ol>
  );
}

function Color({
  colorName,
  shade,
  color,
}: {
  readonly colorName: string;
  readonly shade: number | undefined;
  readonly color: string;
}): JSX.Element {
  const { l } = asLAB(asCIEXYZ(asSRGB(color)));
  return (
    <article
      className={`flex items-center justify-center rounded p-2 font-mono text-sm font-semibold transition-all hover:scale-110 hover:shadow-md ${
        l > 50 ? "text-neutral-950" : "text-neutral-50"
      }`}
      style={{ backgroundColor: color }}
    >
      {colorName}
      {shade !== undefined && <>-{shade}</>}
    </article>
  );
}
