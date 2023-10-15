import React from "react";
import PrioritiesSelect from "../elements/PrioritiesSelect";

/* const priorityOptions = [
  {
    id: "high",
    label: "Alta",
    color: "red",
  },
  {
    id: "medium",
    label: "Media",
    color: "orange",
  },
  {
    id: "low",
    label: "Baja",
    color: "yellow",
  }
]; */

const FormTasks = (props) => {
  const priorityOptions = [
    {
      id: "high",
      label: "Alta",
      color: "red",
    },
    {
      id: "medium",
      label: "Media",
      color: "orange",
    },
    {
      id: "low",
      label: "Baja",
      color: "yellow",
    }
  ];
  return (
    <div className="container_form-tasks">
      <h4 className="font-semibold text-xl mb-2">Crea una tarea</h4>
      <form className="flex flex-col w-full" onSubmit={props?.handleSubmit}>
        <div className="w-full">
          <p className="my-0">Seleccione la prioridad *</p>
          <div className="list-priorities w-full flex items-center gap-4 mt-1 mb-4">
            {priorityOptions?.length ? priorityOptions?.map((option, index) => (
              <PrioritiesSelect
                key={index}
                keyValue={index}
                handleChangePriority={props?.handleChangePriority}
                priority={props?.formData?.priority?.id}
                dataPriority={option}
              />
            )) : null }
          </div>
        </div>

        <label htmlFor="title">Título *</label>
        <div className="flex justify-between gap-2 mb-4 mt-1">
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Título de la tarea"
            maxLength={"255"}
            className="outline-none ring-2 rounded-md py-2 px-4 ring-zinc-100 w-full focus:ring-zinc-200"
            value={props?.formData?.title ?? undefined}
            onChange={(e) => props?.handleChangeInput(e?.target?.value)}
          />
          <button
            type="submit"
            disabled={props?.formData?.title === ""}
            className={`
                ${
                  props?.formData?.title === ""
                    ? "cursor-not-allowed opacity-50"
                    : "pointer hover:bg-teal-400 hover:shadow-md"
                } 
                btn ms-auto flex justify-end p-2 bg-teal-500  text-white rounded-md font-semibold tracking-wide shadow-black pointer hover:bg-teal-400 hover:shadow-md transition-all`}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTasks;
