import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

let timeout,
  count = 0;
export function Collapse({
  children,
  title,
  defaultCollapsed,
  collapsed,
  alwaysOpen = false,
  rootClassNames = "",
  headerClassNames = "",
  iconClassNames = "",
  titleClassNames = "",
}) {
  const [internalCollapsed, setInternalCollapsed] = useState(
    alwaysOpen ? false : defaultCollapsed || collapsed || false
  );
  const ctr = useRef(null);
  const [haveHeight, setHaveHeight] = useState(false);

  useEffect(() => {
    setInternalCollapsed(!alwaysOpen && collapsed);
  }, [collapsed]);

  function setHeight() {
    if (count > 10) return;

    if (ctr.current) {
      const contentCtr = ctr.current.querySelector(".collapse-content");
      if (contentCtr) {
        if (contentCtr.offsetHeight > 0) {
          setHaveHeight(true);
          ctr.current.style.maxHeight = !internalCollapsed
            ? `${contentCtr.offsetHeight}px`
            : "0px";
        } else {
          timeout = setTimeout(() => {
            count++;
            if (count > 10) {
              clearTimeout(timeout);
            }

            setHeight();
          }, 300);
        }
      }
    }
  }

  useEffect(() => {
    setHeight();
    return () => {
      clearTimeout(timeout);
    };
  }, [internalCollapsed, children]);

  return (
    <>
      <div
        className={twMerge("max-h-96 mb-2 pointer-events-auto", rootClassNames)}
      >
        <div
          className={twMerge("h-10 w-full cursor-pointer", headerClassNames)}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setInternalCollapsed(!alwaysOpen && !internalCollapsed);
          }}
        >
          <ChevronRightIcon
            className={twMerge("w-4 h-4 inline fill-gray-500", iconClassNames)}
            style={{
              transition: "transform 0.3s ease-in-out",
              marginRight: "3px",
              top: "1px",
              transform: internalCollapsed ? "rotate(0deg)" : "rotate(90deg)",
            }}
          />
          <span className={twMerge("font-bold text-md", titleClassNames)}>
            {title}
          </span>
        </div>
        <div
          ref={ctr}
          style={{
            overflow: "hidden",
            maxHeight: "0px",
            transition: "max-height 0.6s ease-in-out",
          }}
        >
          <div className="collapse-content">{children}</div>
        </div>
      </div>
    </>
  );
}
