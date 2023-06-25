import { PropsWithChildren, useMemo, useState } from "react";
import { twNearest } from "./twNearest";

export function App() {
  const [color, setColor] = useState("#000000");

  const closest = useMemo(() => twNearest(color), [color]);

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full items-center justify-evenly gap-8 overflow-hidden">
        <form>
          <label className="flex items-center gap-2">
            Color:{" "}
            <input
              type="color"
              onChange={({ currentTarget: { value } }) => {
                setColor(value);
              }}
            />
          </label>
        </form>
        <section className="flex h-1/2 w-96">
          <div className="h-full flex-1" style={{ backgroundColor: color }} />
          <ol className="h-full flex-[3_3] overflow-hidden overflow-y-auto">
            {closest.map(({ color, names, distance }) => (
              <li key={color}>
                {names.length > 1 ? (
                  <ul>
                    {names.map(([colorName, shade]) => (
                      <li key={colorName}>
                        <Color
                          colorName={colorName}
                          shade={shade}
                          color={color}
                        >
                          {distance}
                        </Color>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Color
                    colorName={names[0][0]}
                    shade={names[0][1]}
                    color={color}
                  >
                    {distance.toFixed(2)}
                  </Color>
                )}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

function Color({
  colorName,
  shade,
  color,
  children,
}: PropsWithChildren<{
  readonly colorName: string;
  readonly shade: number | undefined;
  readonly color: string;
}>): JSX.Element {
  return (
    <article className="flex w-full gap-2">
      <div className="w-1/2" style={{ backgroundColor: color }} />
      <div className="flex items-center justify-center p-2">
        <pre className="flex-none rounded bg-gray-200 p-1 font-mono text-xs font-semibold text-gray-800">
          {colorName}
          {shade !== undefined && <>-{shade}</>}
        </pre>
      </div>
      {children}
    </article>
  );
}
