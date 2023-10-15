import React from "react";

const Tooltip = ({children, dataLabel, className, show}) => {
  return (
    <div className={`container_tooltip ${className ?? ''}`}>
      <div className="group relative flex justify-center">
        {children}
        {/* <button class="rounded bg-amber-500 px-4 py-2 text-sm text-white shadow-sm">
          Hover me!
        </button> */}
        <span
          className={`
              ${show ? 'scale-100' : 'scale-0'}
              absolute z-10 top-10 scale-0 transition-all rounded p-2
            `}
          >
          {dataLabel}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
