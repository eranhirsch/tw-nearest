import { useMemo, useState } from "react";
import { twNearest } from "./twNearest";
import { asLAB } from "./color_spaces/cielab";
import { asCIEXYZ } from "./color_spaces/ciexyz";
import { asSRGB } from "./color_spaces/srgb";

export function App() {
  const [pivotColor, setPivotColor] = useState<string>();
  const [targetColor, setTargetColor] = useState<string>();

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full items-center justify-center gap-8 overflow-hidden p-12">
        <ColorSelector onChange={setPivotColor} />
        {pivotColor !== undefined && (
          <Results color={pivotColor} onColorClick={setTargetColor} />
        )}
        {targetColor !== undefined && pivotColor !== undefined && (
          <Comparer pivotColor={pivotColor} targetColor={targetColor} />
        )}
      </main>
    </div>
  );
}

function Comparer({
  pivotColor,
  targetColor,
}: {
  readonly pivotColor: string;
  readonly targetColor: string;
}): JSX.Element {
  const [pivotOnTop, setPivotOnTop] = useState(false);

  return (
    <section className="flex cursor-pointer select-none items-center justify-center">
      <div
        className={`h-24 w-32 rounded p-1 text-xs font-medium ${
          pivotOnTop ? "z-50" : ""
        }`}
        style={{ backgroundColor: pivotColor }}
        onClick={() => {
          setPivotOnTop((current) => !current);
        }}
      >
        Pivot
      </div>
      <div
        className="-ms-14 flex h-24 w-32 items-end justify-end rounded p-1 text-xs font-medium"
        style={{ backgroundColor: targetColor }}
        onClick={() => {
          setPivotOnTop((current) => !current);
        }}
      >
        Target
      </div>
    </section>
  );
}

function ColorSelector({
  onChange,
}: {
  readonly onChange: (value: string) => void;
}): JSX.Element {
  return (
    <form className="flex items-center justify-center">
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

function Results({
  color,
  onColorClick,
}: {
  readonly color: string;
  readonly onColorClick: (clickedColor: string) => void;
}): JSX.Element {
  const closest = useMemo(() => twNearest(color), [color]);

  return (
    <ol className="flex h-full flex-wrap items-center justify-center gap-3 overflow-hidden overflow-y-auto p-1">
      {closest.map(({ color, names }) => (
        <>
          {names.length > 1 ? (
            <>
              {names.map(([colorName, shade]) => (
                <li key={colorName}>
                  <Color
                    colorName={colorName}
                    shade={shade}
                    color={color}
                    onClick={onColorClick}
                  />
                </li>
              ))}
            </>
          ) : (
            <li key={color}>
              <Color
                colorName={names[0][0]}
                shade={names[0][1]}
                color={color}
                onClick={onColorClick}
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
  onClick,
}: {
  readonly colorName: string;
  readonly shade: number | undefined;
  readonly color: string;
  readonly onClick: (clickedColor: string) => void;
}): JSX.Element {
  const { l } = asLAB(asCIEXYZ(asSRGB(color)));
  return (
    <button
      className={`flex items-center justify-center rounded p-2 font-mono text-sm font-semibold transition-all hover:scale-110 hover:shadow-md ${
        l > 50 ? "text-neutral-950" : "text-neutral-50"
      }`}
      style={{ backgroundColor: color }}
      onClick={() => {
        onClick(color);
      }}
    >
      {colorName}
      {shade !== undefined && <>-{shade}</>}
    </button>
  );
}
