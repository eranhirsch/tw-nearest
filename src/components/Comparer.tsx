import { useState } from "react";

export function Comparer({
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
