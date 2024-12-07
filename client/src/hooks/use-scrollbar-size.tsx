import React from "react";

export function useScrollbarSize() {
  const isComputed = React.useRef<boolean>(false);
  const width = React.useRef<number>(0);

  if (isComputed.current)
    return {
      scrollWidth: width.current,
    };

  // Create a div with a scrollbar
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  document.body.appendChild(outer);

  // Create a div without a scrollbar
  const inner = document.createElement("div");
  outer.appendChild(inner);

  const widthValue = outer.offsetWidth - inner.offsetWidth;

  outer.remove();

  isComputed.current = true;
  width.current = widthValue;

  return {
    scrollWidth: widthValue,
  };
}
