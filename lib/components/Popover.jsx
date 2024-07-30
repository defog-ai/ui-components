import React from "react";

/**
 * "On hover" Popover component.
 * @param {Object} props
 * @param {React.ReactNode} props.children - This is the element that will trigger the popover when hovered.
 * @param {React.ReactNode} props.content - The content of the popover panel.
 *
 * @example
 * // Shows a popover with the content "Popover content" when the button is hovered.
 * <Popover content={<div>Popover content</div>}>
 *  <button>Click me</button>
 * </Popover>
 *
 */
export function Popover({ children, content }) {
  return (
    <div className="relative group">
      {content ? (
        <div className="popover-panel absolute w-fit hidden group-hover:block p-4 bg-white text-gray-600 bottom-full pointer-events-none z-10 left-1/2 -translate-x-1/2 mx-auto rounded-md border border-gray-400">
          {content}
        </div>
      ) : (
        <></>
      )}
      {children}
    </div>
  );
}
