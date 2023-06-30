import { useParams } from "react-router-dom";
import invariant from "tiny-invariant";

export function useParameterColor(parameterName: string): string {
  const { [parameterName]: parameterValue } = useParams();
  invariant(parameterValue !== undefined, "pivotColor is undefined");
  return `#${parameterValue}`;
}
