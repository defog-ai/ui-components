import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const inputSizeClasses = {
  default: "py-1.5 pr-5 ",
  small: "py-0 pr-5",
};

let Input = forwardRef(function Input(
  {
    value = undefined,
    defaultValue = undefined,
    label = null,
    type = "text",
    status = null,
    disabled = false,
    rootClassNames = "",
    placeholder = "Enter text here",
    id = "",
    name = "text-input",
    onChange = (...args) => {},
    onPressEnter = (...args) => {},
    inputHtmlProps = {},
    inputClassNames = "",
    size = "default",
  },
  ref
) {
  return (
    <div className={twMerge("text-gray-600", rootClassNames)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-xs mb-2 font-light text-gray-600"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-md">
        <input
          ref={ref}
          type={type}
          name={name}
          id={id}
          className={twMerge(
            "block w-full shadow-sm rounded-md border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset",
            status !== "error"
              ? "focus:ring-blue-400"
              : "focus:ring-rose-400 ring-rose-400",
            "text-[16px] lg:text-sm sm:leading-6",
            disabled
              ? "bg-gray-100 text-gray-400  focus:ring-gray-100 cursor-not-allowed"
              : "bg-white",
            inputSizeClasses[size] || inputSizeClasses["default"],
            inputClassNames
          )}
          placeholder={placeholder}
          aria-invalid="true"
          aria-describedby="email-error"
          disabled={disabled}
          onChange={(ev) => {
            if (disabled) return;
            onChange(ev);
          }}
          onKeyDown={(ev) => {
            if (disabled) return;
            if (ev.key === "Enter") {
              onPressEnter(ev);
            }
          }}
          {...inputHtmlProps}
          {...{ defaultValue, value }}
        />
        {status === "error" && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 stroke-rose-400 text-transparent"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
});
export { Input };
