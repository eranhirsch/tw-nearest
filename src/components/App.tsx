import { useState } from "react";
import { Comparer } from "./Comparer";
import { CssColorPicker } from "./CssColorPicker";
import { Results } from "./Results";

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
          className="text-md rounded-lg border p-2 font-mono text-neutral-500 transition focus-within:shadow-lg"
          onChange={setPivotColor}
          placeholder="CSS Color"
        />
        <Results color={pivotColor} onColorClick={setTargetColor} />
        <Comparer pivotColor={pivotColor} targetColor={targetColor} />
      </main>
    </div>
  );
}
