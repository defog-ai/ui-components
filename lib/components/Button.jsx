import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Button component
 *
 * @param {Object} props
 * @param {string} props.id - Id of the button.
 * @param {function} props.onClick - Function to be called when the button is clicked.
 * @param {string} props.className - Additional classes to be added to the button.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {boolean} props.disabled - If true, the button will be disabled.
 */
export function Button({
  id = null,
  onClick = (...args) => {},
  className = "",
  children = null,
  disabled = false,
}) {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={(ev) => {
        if (disabled) return;
        onClick(ev);
      }}
      className={twMerge(
        "px-2 py-1 rounded-md text-white bg-blue-500 text-xs hover:bg-blue-600",
        disabled
          ? "bg-gray-50 text-gray-300 hover:bg-gray-50 cursor-not-allowed"
          : "",
        className
      )}
    >
      {children}
    </button>
  );
}
