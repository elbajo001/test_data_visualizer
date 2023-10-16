import React, { useState } from "react";
import PrioritiesSelect from "../elements/PrioritiesSelect";

const FormTasks = (props) => {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="container_form-tasks">
      <div className="flex flex-row justify-between transition-all">
        <h4 className="my-0 font-semibold text-xl">Crea una tarea</h4>
        <i
          className="bi bi-caret-down-fill flex justify-center items-center cursor-pointer"
          style={{
            fontSize: "1.225rem",
            transform: `${showForm ? "rotateZ(180deg)" : "rotateZ(0deg)"}`,
          }}
          onClick={() => setShowForm(!showForm)}
        ></i>
      </div>
      {/* <h4 className="font-semibold text-xl mb-2">Crea una tarea</h4> */}
      {showForm ? (
        <form className="flex flex-col w-full" onSubmit={props?.handleSubmit}>
          <PrioritiesSelect
            formData={props?.formData}
            priorityOptions={props?.priorityOptions}
            handleChangePriority={props?.handleChangePriority}
          />
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
              disabled={
                props?.formData?.title === "" || !props?.formData?.priority
              }
              className={`
                  ${
                    props?.formData?.title === "" || !props?.formData?.priority
                      ? "cursor-not-allowed opacity-50"
                      : "pointer hover:bg-teal-400 hover:shadow-md"
                  } 
                  btn ms-auto flex justify-end p-2 bg-teal-500  text-white rounded-md font-semibold tracking-wide shadow-black pointer hover:bg-teal-400 hover:shadow-md transition-all`}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default FormTasks;
