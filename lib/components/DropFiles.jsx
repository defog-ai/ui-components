import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

export function DropFiles({
  label = "Drop files here",
  onDrop = (...args) => {},
  onFileSelect = (...args) => {},
  onDragOver = (...args) => {},
  onDragEnter = (...args) => {},
  rootClassNames = "",
  iconClassNames = "",
  children = null,
  icon = null,
}) {
  return (
    <div
      className={twMerge("relative text-gray-600 text-center", rootClassNames)}
      onDrop={(e) => onDrop(e)}
      onDragEnter={(e) => {
        e.preventDefault();
        onDragEnter(e);
      }}
      onDragOver={(e) => {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
        onDragOver(e);
      }}
    >
      {label && (
        <label className="block text-xs mb-2 font-light text-gray-600">
          {label}
        </label>
      )}
      {children}
      <div className="flex flex-col items-center justify-center">
        {icon || (
          <ArrowDownTrayIcon className={twMerge("h-6 w-6", iconClassNames)} />
        )}
        <div className="mt-2 relative group">
          <p className="text-xs text-gray-400 group-hover:underline z-[2] relative pointer-events-none">
            Select from your computer
          </p>
          <input
            aria-label=""
            accept="text/csv"
            className="w-full h-full z-[1] opacity-0 absolute left-0 top-0"
            type="file"
            onInput={(e) => {
              e.preventDefault();
              onFileSelect(e);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}
