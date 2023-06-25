import { useMemo, useState } from "react";
import { twNearest } from "./twNearest";

export function App() {
  const [color, setColor] = useState<string>();

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full items-center justify-evenly gap-12 overflow-hidden p-12">
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
    <ol className="flex h-full w-1/2 flex-wrap items-center justify-center gap-1 overflow-hidden overflow-y-auto">
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
  return (
    <article
      className="flex items-center justify-center rounded p-1 font-mono text-xs font-semibold"
      style={{ backgroundColor: color }}
    >
      {colorName}
      {shade !== undefined && <>-{shade}</>}
    </article>
  );
}
