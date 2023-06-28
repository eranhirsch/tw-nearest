import { Fragment, useState } from "react";
import { Comparer } from "./Comparer";
import { CssColorPicker } from "./CssColorPicker";
import { Results } from "./Results";
import { filter, keys, map, pipe, toPairs } from "remeda";
import { MEASURERS } from "../color_spaces/measurers";
import { MultiPicker } from "./MultiPicker";

const INITIAL_PIVOT_COLOR = "#ffffff";
const INITIAL_TARGET_COLOR = "#000000";

const DEFAULT_ACTIVE_MEASURERS = [
  "cie94",
] as const satisfies readonly (keyof typeof MEASURERS)[];

const ALL_MEASURERS = keys.strict(MEASURERS);

export function App() {
  const [pivotColor, setPivotColor] = useState(INITIAL_PIVOT_COLOR);
  const [targetColor, setTargetColor] = useState(INITIAL_TARGET_COLOR);
  const [activeMeasurers, setActiveMeasurers] = useState<
    readonly (keyof typeof MEASURERS)[]
  >(DEFAULT_ACTIVE_MEASURERS);

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full flex-col items-center justify-center gap-12 overflow-hidden px-32 py-24">
        <section className="flex w-full items-stretch justify-evenly gap-8">
          <CssColorPicker
            value={pivotColor}
            style={{ borderColor: pivotColor }}
            className={`text-md w-64 rounded-lg border p-2 font-mono text-neutral-500 transition focus-within:shadow-lg ${
              pivotColor === "#ffffff" ? "!border-neutral-300" : ""
            }`}
            onChange={setPivotColor}
            placeholder="CSS Color"
          />
          <MultiPicker
            className="text-md w-64 rounded-lg border border-neutral-300 font-mono transition focus-within:shadow-lg"
            value={activeMeasurers}
            allValues={ALL_MEASURERS}
            onChange={setActiveMeasurers}
          />
        </section>
        <section className="grid grid-cols-[min-content_auto] gap-5">
          {pipe(
            MEASURERS,
            toPairs.strict,
            filter(([measurerName]) => activeMeasurers.includes(measurerName)),
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
