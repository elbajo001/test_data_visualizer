import React from "react";

const PrioritiesSelect = (props) => {
  const { keyValue, priority, dataPriority, handleChangePriority } = props
  // console.log('props?.dataPriority', priority && priority?.toString() === dataPriority?.id?.toString())
  return (
    <button
      key={keyValue}
      type="button"
      onClick={() => {
        handleChangePriority(dataPriority);
      }}
      className={`
        ${priority && priority?.toString() === dataPriority?.id?.toString() ? `bg-${dataPriority?.color}-400 ` : `bg-grey-100 hover:bg-${dataPriority?.color}-100 hover:ring-${dataPriority?.color}-300`}
        ring-slate-300
        text-slate-500
        font-regular
        hover:text-slate-800
        rounded-md
        py-2
        px-8
        ring-1
        cursor-pointer
        transition-all
        w-1/3
        md:w-fit
        md:px-16
        text-center
      `}>
      {dataPriority?.label}
    </button>
  );
};

export default PrioritiesSelect;
