import { useMemo } from "react";
import { twNearest } from "../twNearest";
import { contrastTextClassName } from "./contrastTextClassName";

export function Results({
  color,
  onColorClick,
}: {
  readonly color: string;
  readonly onColorClick: (clickedColor: string) => void;
}): JSX.Element {
  const closest = useMemo(() => twNearest(color), [color]);

  return (
    <ol className="flex shrink flex-wrap content-start items-center justify-center gap-3 overflow-hidden overflow-y-auto p-1">
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
  return (
    <button
      className={`flex items-center justify-center rounded p-2 font-mono text-sm font-semibold transition-all hover:scale-110 hover:shadow-md ${contrastTextClassName(
        color,
      )}`}
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
