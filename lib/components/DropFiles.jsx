import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

export function DropFiles({
  label = "Drop files here",
  onDrop = (...args) => {},
  onDragOver = (...args) => {},
  rootClassNames = "",
  iconClassNames = "",
}) {
  return (
    <div
      className={twMerge("text-gray-600 text-center", rootClassNames)}
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => {
        // Preent default behavior (Prevent file from being opened)
        e.preventDefault();
        onDragOver(e);
      }}
    >
      {label && (
        <label className="block text-xs mb-2 font-light text-gray-600">
          {label}
        </label>
      )}
      <ArrowDownTrayIcon
        className={twMerge("m-auto h-6 w-6", iconClassNames)}
      />
    </div>
  );
}
