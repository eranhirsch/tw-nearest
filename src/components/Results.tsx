import { useMemo } from "react";
import { twNearest } from "../twNearest";
import { contrastTextClassName } from "./contrastTextClassName";
import { NavLink } from "react-router-dom";

const RESULTS_TO_SHOW = 8;

export function Results({
  pivotColor,
  measurerFunction,
}: {
  readonly pivotColor: string;
  readonly measurerFunction: (pivot: string) => (target: string) => number;
}): JSX.Element {
  const closest = useMemo(
    () => twNearest(measurerFunction(pivotColor)).slice(0, RESULTS_TO_SHOW),
    [measurerFunction, pivotColor],
  );

  return (
    <ol className="flex shrink flex-wrap content-start items-center justify-center gap-3 overflow-hidden overflow-y-auto p-2">
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
    <NavLink
      to={`../${color.slice(1)}`}
      relative="path"
      className={`flex items-center justify-center rounded p-2 font-mono text-sm font-semibold transition hover:-translate-y-2 hover:scale-105 hover:shadow-md [&.active]:scale-105 [&.active]:animate-bounce [&.active]:shadow-none ${contrastTextClassName(
        color,
      )} ${
        color === "#ffffff" ? "border border-dashed border-neutral-300" : ""
      }}`}
      style={{ backgroundColor: color }}
    >
      {colorName}
      {shade !== undefined && <>-{shade}</>}
    </NavLink>
  );
}
