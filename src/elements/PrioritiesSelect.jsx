import React, { useEffect } from "react";

const PrioritiesSelect = (props) => {
  const { priority, dataPriority, handleChangePriority } = props
  useEffect(() => {
    console.log({ priority, ...props?.dataPriority})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.priority, props?.dataPriority])
  
  // console.log('props?.dataPriority', priority && priority?.toString() === dataPriority?.id?.toString())
  return (
    <>
      {dataPriority?.color ?
        <button
          type="button"
          onClick={() => {
            handleChangePriority(dataPriority);
          }}
          className={`bg-${dataPriority?.color}-200 ring-${dataPriority?.color}-300 hover:bg-${dataPriority?.color}-200 hover:ring-${dataPriority?.color}-400 ring-slate-300 text-slate-500 font-regular hover:text-slate-800 rounded-md py-2 px-8 ring-1 cursor-pointer transition-all w-full`?.toString()?.trim()}>
          {dataPriority?.label}
        </button>
      : null }
    </>
  );
};

export default PrioritiesSelect;
