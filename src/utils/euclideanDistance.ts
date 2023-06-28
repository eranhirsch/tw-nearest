export const euclideanDistance =
  <K extends string>(
    parser: (color: string) => Readonly<Record<K, number>>,
    parts: readonly K[],
    cyclic?: { part: K; max: number },
  ) =>
  (pivot: string) => {
    const parsedPivot = parser(pivot);
    return (target: string) => {
      const parsedTarget = parser(target);
      let distance = 0;
      for (const part of parts) {
        const pivotPart = parsedPivot[part];
        const targetPart = parsedTarget[part];
        distance +=
          Number.isNaN(pivotPart) || Number.isNaN(targetPart)
            ? 0
            : Math.min(
                Math.pow(pivotPart - targetPart, 2),
                cyclic !== undefined && part === cyclic.part
                  ? Math.pow(cyclic.max - pivotPart - targetPart, 2)
                  : Number.POSITIVE_INFINITY,
              );
      }
      return Math.pow(distance, 0.5);
    };
  };
