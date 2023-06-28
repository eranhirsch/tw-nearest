import { Fragment, useState } from "react";
import { Comparer } from "./Comparer";
import { CssColorPicker } from "./CssColorPicker";
import { Results } from "./Results";
import { map, pipe, toPairs } from "remeda";
import { MEASURERS } from "../color_spaces/measurers";

const INITIAL_PIVOT_COLOR = "#ffffff";
const INITIAL_TARGET_COLOR = "#000000";

export function App() {
  const [pivotColor, setPivotColor] = useState(INITIAL_PIVOT_COLOR);
  const [targetColor, setTargetColor] = useState(INITIAL_TARGET_COLOR);

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full flex-col items-center justify-center gap-12 overflow-hidden px-32 py-24">
        <CssColorPicker
          value={pivotColor}
          style={{ borderColor: pivotColor }}
          className={`text-md rounded-lg border p-2 font-mono text-neutral-500 transition focus-within:shadow-lg ${
            pivotColor === "#ffffff" ? "!border-neutral-300" : ""
          }`}
          onChange={setPivotColor}
          placeholder="CSS Color"
        />
        <section className="grid grid-cols-[min-content_auto] gap-5">
          {pipe(
            MEASURERS,
            toPairs.strict,
            map(([measurerName, measurer]) => (
              <Fragment key={measurerName}>
                <h6 className="flex items-center justify-end text-xs font-bold uppercase">
                  {measurerName}
                </h6>
                <Results
                  key={measurerName}
                  pivotColor={pivotColor}
                  onColorClick={setTargetColor}
                  targetColor={targetColor}
                  measurerFunction={measurer}
                />
              </Fragment>
            )),
          )}
        </section>
        <Comparer pivotColor={pivotColor} targetColor={targetColor} />
      </main>
    </div>
  );
}
