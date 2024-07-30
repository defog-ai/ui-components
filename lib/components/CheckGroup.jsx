import React, { useState } from "react";

/**
 * @type {React.FC<CheckGroupProps>}
 * CheckGroup component
 *
 * @param {Object} props - The props for the component
 * @param {Array<{id: string, title: string}>} props.options - The options to be displayed.
 * @param {string} props.title - The title of the check group.
 * @param {string} props.subhead - The subhead of the check group.
 * @param {boolean} props.disabled - If true, the check group will be disabled.
 * @param {string} props.defaultChecked - The default checked option.
 * @param {function} props.onChange - Function to be called when the option is changed.
 */
export function CheckGroup({
  options = [],
  title = "Select an option",
  onChange = (...args) => {},
  subhead = null,
  disabled = false,
  defaultChecked = null,
}) {
  const [selectedOption, setSelectedOption] = useState(
    defaultChecked || options?.[0]?.id
  );

  return (
    <fieldset className="">
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        {title}
      </legend>
      {subhead && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{subhead}</p>
      )}

      <div className="mt-2 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
        {options.map((opt, i) => (
          <div
            key={opt.id}
            className="flex items-center"
            onClick={() => {
              setSelectedOption(opt.id);
              onChange(opt);
            }}
          >
            <input
              id={opt.id}
              name="rg-group"
              disabled={disabled}
              value={opt.id}
              type="checkbox"
              checked={opt.id === selectedOption}
              onChange={() => {
                setSelectedOption(opt.id);
                onChange(opt);
              }}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor={opt.id}
              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
            >
              {opt.title}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
