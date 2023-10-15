import React, { useEffect } from "react";

const PrioritiesSelect = (props) => {
  const { keyValue, priority, dataPriority, handleChangePriority } = props
  useEffect(() => {
    console.log({ priority, ...props?.dataPriority})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.priority, props?.dataPriority])
  
  // console.log('props?.dataPriority', priority && priority?.toString() === dataPriority?.id?.toString())
  return (
    <>
      {dataPriority ?
        <button
          key={keyValue}
          type="button"
          onClick={() => {
            handleChangePriority(dataPriority);
          }}
          className={`
            ${priority?.toString() === dataPriority?.id?.toString() ? `bg-${dataPriority?.color}-100 ` : `bg-grey-100 hover:bg-${dataPriority?.color}-100 hover:ring-${dataPriority?.color}-300`} 
            ring-slate-300 text-slate-500 font-regular hover:text-slate-800 rounded-md py-2 px-8 ring-1 cursor-pointer transition-all w-1/3 md:w-fit md:px-16 text-center`?.toString()?.trim()}>
          {dataPriority?.label}
        </button>
      : null }
    </>
  );
};

export default PrioritiesSelect;
