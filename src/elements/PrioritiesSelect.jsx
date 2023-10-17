import React, { useEffect, useState } from "react";

const PrioritiesSelect = (props) => {
  const [priority, setPriority] = useState({})

  useEffect(() => {
    if (props?.prioritySelected) {
      setPriority(props?.prioritySelected)
    }
  }, [props?.prioritySelected]);
  
  const handleChangeOption = (option) => {
    props?.handleChangePriority(option)
    setPriority(option)
  }
  
  const getColor = (name, border) => {
    switch (name) {
      case "orange":
        return border ? "#fdba74" : "#ffedd5";
      case "yellow":
        return border ? "#fcd34d" : "#fef9c3";
      case "red":
        return border ? "#fca5a5" : "#fee2e2";
      default:
        break;
    }
  };
  
  const getIdPriority = () => {
    let id = undefined
    if (props?.prioritySelected?.id) {
      id = priority?.id
    } else {
      id = props?.formData?.priority?.id
    }
    return id
  } 

  return (
    <div className="container_priorities-select w-full mt-2">
      <p className="my-0">Seleccione la prioridad *</p>
      <div className="list-priorities w-full flex items-center gap-4 mt-1 mb-4">
        {props?.priorityOptions?.length
          ? props?.priorityOptions?.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleChangeOption(option)}
                style={{
                  background: `${
                    option?.id === getIdPriority()
                      ? getColor(option?.color, false)
                      : `#f5f5f5`
                  }`,
                  border: `2px solid ${
                    option?.id === getIdPriority()
                      ? getColor(option?.color, true)
                      : `#cbd5e1`
                  }`,
                }}
                className={`
                        ${
                          option?.id === getIdPriority()
                            ? `text-slate-800`
                            : `text-slate-400`
                        }
                        w-1/3 md:w-fit md:px-16 text-center font-semibold hover:text-slate-800 rounded-md py-2 px-8 cursor-pointer transition-all
                        `
                  ?.toString()
                  ?.trim()}
              >
                {option?.label}
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

export default PrioritiesSelect;
