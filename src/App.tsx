import { useState } from "react";
import { Comparer } from "./components/Comparer";
import { ColorSelector } from "./components/ColorSelector";
import { Results } from "./components/Results";

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
