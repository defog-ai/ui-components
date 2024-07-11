import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export function Toggle({
  title = null,
  onLabel = null,
  offLabel = null,
  defaultOn = false,
  titleClassNames = "",
  onClassNames = "",
  offClassNames = "",
  toggleClassNames = "",
  rootClassNames = "",
  labelClasses = "",
  disabled = false,
  onToggle = (...args) => { },
}) {
  const [on, setOn] = useState(defaultOn);

  return (
    <div className={twMerge("flex flex-col", rootClassNames)}>
      {title && (
        <label
          className={twMerge(
            "block text-xs mb-2 font-light text-gray-600",
            titleClassNames
          )}
        >
          {title}
        </label>
      )}
      <Field
        as="div"
        className={twMerge("flex items-center", toggleClassNames)}
      >
        <Switch
          disabled={disabled}
          checked={on}
          onChange={(v) => {
            setOn(v);
            onToggle(v);
          }}
          className={twMerge(
            on ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-none focus:ring-indigo-600 focus:ring-offset-2",
            on ? onClassNames : offClassNames,
            !disabled ? "cursor-pointer" : "cursor-not-allowed"
          )}
        >
          <span
            aria-hidden="true"
            className={twMerge(
              on ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
        <Label
          as="div"
          className={twMerge(
            "ml-2 block text-xs font-light text-gray-600",
            labelClasses
          )}
        >
          {on ? onLabel : offLabel}
        </Label>
      </Field>
    </div>
  );
}
