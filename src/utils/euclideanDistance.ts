export const euclideanDistance =
  <K extends string>(
    parser: (color: string) => Readonly<Record<K, number>>,
    parts: readonly K[],
  ) =>
  (pivot: string) => {
    const parsedPivot = parser(pivot);
    return (target: string) => {
      const parsedTarget = parser(target);
      let distance = 0;
      for (const part of parts) {
        const pivotPart = parsedPivot[part];
        const targetPart = parsedTarget[part];
        distance += Math.pow(
          Number.isNaN(pivotPart) || Number.isNaN(targetPart)
            ? 0
            : pivotPart - targetPart,
          2,
        );
      }
      return Math.pow(distance, 0.5);
    };
  };
