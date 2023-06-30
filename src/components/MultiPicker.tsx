import { Listbox } from "@headlessui/react";
import { CheckIcon } from "../components/icons/CheckIcon";
import { ChevronUpDownIcon } from "../components/icons/ChevronUpDownIcon";

export function MultiPicker<T extends string>({
  className,
  value,
  allValues,
  onChange,
}: {
  readonly className?: string | undefined;
  readonly value: readonly T[];
  readonly allValues: readonly T[];
  readonly onChange: (newValue: readonly T[]) => void;
}): JSX.Element {
  return (
    <Listbox
      value={value}
      onChange={onChange}
      multiple
      as="div"
      className={`relative ${className ?? ""}`}
    >
      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
        <div className="truncate uppercase">{value.join(", ")}</div>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Listbox.Options className="absolute mt-4 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none active:bg-amber-100 active:text-amber-900">
        {allValues.map((measurerName) => (
          <Listbox.Option
            key={measurerName}
            value={measurerName}
            className="relative cursor-default select-none py-2 pl-10 pr-4 uppercase"
          >
            <div className="truncate ui-selected:font-medium">
              {measurerName}
            </div>
            <span className="invisible absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 ui-selected:visible">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
