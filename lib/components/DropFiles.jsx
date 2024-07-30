import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

/**
 * File dropping component with a UI. If you want something headless, use the DropFilesHeadless component which gives a minimal UI.
 * @param {Object} props
 * @param {string} [props.label] - Label for the dropzone.
 * @param {function} [props.onDrop] - Function to be called when files are dropped.
 * @param {function} [props.onFileSelect] - Function to be called when a file is selected.
 * @param {function} [props.onDragOver] - Function to be called when a file is dragged over the dropzone.
 * @param {function} [props.onDragEnter] - Function to be called when a file is dragged over the dropzone.
 * @param {string} [props.rootClassNames] - Additional classes to be added to the root div.
 * @param {string} [props.iconClassNames] - Additional classes to be added to the icon.
 * @param {string} [props.contentClassNames] - Additional classes to be added to the content div.
 * @param {string} [props.labelClassNames] - Additional classes to be added to the label div.
 * @param {React.ReactNode} [props.children] - The content of the dropzone.
 * @param {boolean} [props.showIcon] - If true, the drop icon will be shown.
 * @param {boolean} [props.disabled] - If true, the dropzone will be disabled.
 */
export function DropFiles({
  label = "Drop files here",
  onDrop = (...args) => {},
  onFileSelect = (...args) => {},
  onDragOver = (...args) => {},
  onDragEnter = (...args) => {},
  rootClassNames = "",
  iconClassNames = "",
  contentClassNames = "",
  labelClassNames = "",
  children = null,
  showIcon = null,
  disabled = false,
}) {
  return (
    <div
      className={twMerge("relative text-gray-600", rootClassNames)}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;

        onDrop(e);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;

        onDragEnter(e);
      }}
      onDragOver={(e) => {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;

        onDragOver(e);
      }}
    >
      {label && (
        <label
          className={twMerge(
            "block text-xs mb-2 font-light text-gray-600",
            labelClassNames
          )}
        >
          {label}
        </label>
      )}
      <div className={contentClassNames}>
        {children}
        {showIcon && (
          <ArrowDownTrayIcon className={twMerge("h-6 w-6", iconClassNames)} />
        )}
        <div className="mt-2 relative group cursor-pointer">
          <p className="cursor-pointer text-xs text-gray-400 group-hover:underline z-[2] relative pointer-events-none">
            Select from your computer
          </p>
          <input
            aria-label=""
            accept="text/csv"
            className="cursor-pointer w-full h-full z-[1] opacity-0 absolute left-0 top-0"
            type="file"
            disabled={disabled}
            onInput={(e) => {
              e.preventDefault();
              if (disabled) return;
              onFileSelect(e);

              // set value to null jic user wants to upload the same file again
              e.target.value = null;
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}
