// controllable slider component

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Simple slider component.
 * @param {Object} props
 * @param {number} [props.min=0] - The minimum value of the slider.
 * @param {number} [props.max=10] - The maximum value of the slider.
 * @param {number} [props.step=1] - # NOT IMPLEMENTED.
 * The step of the slider.
 * @param {number} [props.defaultValue=undefined] - The default value of the slider.
 * @param {number} [props.value=undefined] - The value of the slider. This makes the slider controllable.
 * @param {function} [props.onChange=() => {}] - Function to be called when the slider value changes.
 * @param {string} [props.rootClassNames=""] - Additional classes to be added to the root div.
 * @param {Object} [props.sliderHtmlProps] - Additional props to be added to the input element.
 */
export function Slider({
  min = 0,
  max = 10,
  step = 1,
  defaultValue = undefined,
  value = undefined,
  onChange = (...args) => {},
  rootClassNames = "",
  ...sliderHtmlProps
}) {
  const [v, setV] = useState(value);

  return (
    <input
      // white slider with indigo thumb
      className={twMerge(
        "w-ful bg-white border  appearance-none rounded-2xl",
        rootClassNames
      )}
      type="range"
      min={min}
      max={max}
      onChange={(e) => {
        setV(e.target.value);
        onChange(e.target.value);
      }}
      {...sliderHtmlProps}
      {...{ defaultValue, value }}
    />
  );
}
