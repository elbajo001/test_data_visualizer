import React from "react";

const PrioritiesSelect = (props) => {
  return (
    <button
      key={props?.keyValue}
      type="button"
      onClick={() => {
        props?.handleChangePriority(props?.dataPriority);
      }}
      className={`bg-gray-100 ring-slate-300 text-slate-500 font-regular hover:bg-orange-100 hover:ring-orange-300 hover:text-slate-800  container_priorities-select rounded-md py-2 px-8 ring-1 cursor-pointer transition-all w-1/3 md:w-fit md:px-16 text-center`}>
      {props?.dataPriority?.label}
    </button>
  );
};

export default PrioritiesSelect;
