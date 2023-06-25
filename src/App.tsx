import { PropsWithChildren, useState } from "react";
import { ScoredColor, twNearest } from "./twNearest";

export function App() {
  const [twColors, setTwColors] = useState<readonly ScoredColor[]>([]);

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full items-center justify-evenly gap-8 overflow-hidden">
        <form>
          <label className="flex items-center gap-2">
            Color:{" "}
            <input
              type="color"
              onChange={({ currentTarget: { value } }) => {
                setTwColors(twNearest(value));
              }}
            />
          </label>
        </form>
        <ol className="h-1/2 w-96 overflow-hidden overflow-y-auto">
          {twColors.map(({ color, names, distance }) => (
            <li key={color}>
              {names.length > 1 ? (
                <ul>
                  {names.map(([colorName, shade]) => (
                    <li key={colorName}>
                      <Color colorName={colorName} shade={shade} color={color}>
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
    <div className="flex gap-1 p-2" style={{ backgroundColor: color }}>
      <pre className="rounded bg-gray-200 p-1 font-mono text-xs font-semibold text-gray-800">
        {colorName}
        {shade !== undefined && <>-{shade}</>}
      </pre>
      {children}
    </div>
  );
}
