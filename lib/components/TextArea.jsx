import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { forwardRef, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

let TextArea = forwardRef(function TextArea(
  {
    value = undefined,
    defaultValue = undefined,
    status = null,
    label = null,
    disabled = false,
    defaultRows = 4,
    rootClassNames = "",
    textAreaClassNames = "",
    placeholder = "Enter text here",
    id = "",
    name = "text-input",
    onChange = (...args) => {},
    onKeyDown = (...args) => {},
    textAreaHtmlProps = {},
    autoResize = true,
  },
  ref
) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (autoResize && rootRef?.current) {
      const textArea = rootRef.current.querySelector("textarea");
      if (!textArea) return;

      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  });
  return (
    <div className={twMerge("text-gray-600", rootClassNames)} ref={rootRef}>
      {label && (
        <label htmlFor={name} className="block text-xs mb-2 font-light">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <div className="">
          <textarea
            ref={ref}
            disabled={disabled}
            rows={defaultRows}
            name={name}
            id={id}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className={twMerge(
              "focus:outline-none pl-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset",
              "text-[16px] lg:text-sm leading-6",
              status !== "error"
                ? "focus:ring-blue-400"
                : "focus:ring-rose-400 ring-rose-400",
              disabled
                ? "bg-gray-100 text-gray-400  focus:ring-gray-100 cursor-not-allowed"
                : "bg-white",
              textAreaClassNames
            )}
            onFocus={(ev) => {
              if (autoResize) {
                ev.target.style.height = "auto";
                ev.target.style.height = ev.target.scrollHeight + "px";
              }
            }}
            onChange={(ev) => {
              if (autoResize) {
                ev.target.style.height = "auto";
                ev.target.style.height = ev.target.scrollHeight + "px";
              }
              onChange(ev);
            }}
            {...textAreaHtmlProps}
            {...{ defaultValue, value }}
          />
        </div>
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

export { TextArea };
