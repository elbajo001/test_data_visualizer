import React from "react";

const ListTasks = (props) => {
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

  return (
    <div className="container_list-tasks">
      <h4 className="font-semibold text-xl mb-2">Tus tareas</h4>
      <div className="mb-2 flex gap-2 px-4 z-10">
        <div
          onClick={() => {
            props?.setFilter("all");
            props?.setOrderAsc(!props?.orderAsc);
          }}
          className={`
                  ${
                    props?.filter === "all"
                      ? "bg-gray-800"
                      : "bg-gray-300 hover:bg-gray-500"
                  }
                  py-2 px-4 font-semibold flex justify-center cursor-pointer rounded-md items-center text-white transition-all
                `}
        >
          Todas
          {props?.filter === "all" ? (
            <i
              className="bi bi-arrow-down-up ms-2 rounded-sm bg-gray-600 flex items-center p-[0.375rem] transition-all ease-in-out duration-500"
              style={{
                fontSize: "10px",
                transform: props?.orderAsc
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
            ></i>
          ) : null}
        </div>
        <div
          onClick={() => {
            props?.setFilter("done");
            props?.setOrderAsc(!props?.orderAsc);
          }}
          className={`
                  ${
                    props?.filter === "done"
                      ? "bg-gray-800"
                      : "bg-gray-300 hover:bg-gray-500"
                  }
                  py-2 px-4 font-semibold flex justify-center cursor-pointer rounded-md items-center text-white transition-all
                `}
        >
          Completadas
          {props?.filter === "done" ? (
            <i
              className="bi bi-arrow-down-up ms-2 rounded-sm bg-gray-600 flex items-center p-[0.375rem] transition-all ease-in-out duration-500"
              style={{
                fontSize: "10px",
                transform: props?.orderAsc
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
            ></i>
          ) : null}
        </div>
        <div
          onClick={() => {
            props?.setFilter("pending");
            props?.setOrderAsc(!props?.orderAsc);
          }}
          className={`
                  ${
                    props?.filter === "pending"
                      ? "bg-gray-800"
                      : "bg-gray-300 hover:bg-gray-500"
                  }
                  py-2 px-4 font-semibold flex justify-center cursor-pointer rounded-md items-center text-white transition-all
                `}
        >
          Pendientes
          {props?.filter === "pending" ? (
            <i
              className="bi bi-arrow-down-up ms-2 rounded-sm bg-gray-600 flex items-center p-[0.375rem] transition-all ease-in-out duration-500"
              style={{
                fontSize: "10px",
                transform: props?.orderAsc
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
            ></i>
          ) : null}
        </div>
      </div>
      <div className="container_list-tasks ring-2 p-1 pt-4 lg:px-4 rounded-md ring-gray-100 mt-[-0.9rem] -z-10 block">
        {props?.tasksFiltered
          ? props
              ?.tasksFiltered(props?.tasks?.tasks, props?.filter)
              ?.map((t, index) => (
                <div
                  className="item-task flex gap-2 mb-2 justify-between items-center"
                  key={index}
                >
                  <form
                    onSubmit={props?.handleEdit}
                    style={{
                      backgroundColor: `${getColor(t?.priority?.color, false)}`,
                      border: `1px solid ${getColor(t?.priority?.color, true)}`
                    }}
                    className={`
                    ${t?.isEdit ? "ring-2 ring-zinc-100" : ""} 
                    flex gap-2 p-2 w-full rounded-md transition-all
                  `}
                  >
                    <input
                      type="checkbox"
                      name={`task_edit_${index}`}
                      id={`task_edit_${index}`}
                      disabled={t?.isEdit}
                      defaultChecked={
                        props?.tasks?.tasks?.find(
                          (task) =>
                            task?.title?.toLowerCase() ===
                            t?.title?.toLowerCase()
                        )?.open
                      }
                      checked={
                        props?.tasks?.tasks?.find(
                          (task) =>
                            task?.title?.toLowerCase() ===
                            t?.title?.toLowerCase()
                        )?.open
                      }
                      onChange={() => {
                        props?.handleChangeTask(index, t?.title, "check");
                      }}
                    />
                    {!t?.isEdit ? (
                      <span className={`${t?.done ? "line-through" : ""}`}>
                        {t?.title}
                      </span>
                    ) : (
                      <input
                        type="text"
                        name="titleEdit"
                        id="titleEdit"
                        required
                        placeholder="Título de la tarea"
                        className="outline-none w-full bg-transparent"
                        maxLength={"255"}
                        value={props?.formData?.titleEdit}
                        onChange={(e) =>
                          props?.setFormData({
                            ...props?.formData,
                            titleEdit: e?.target?.value,
                          })
                        }
                      />
                    )}
                  </form>
                  <div className="flex justify-between items-center h-full">
                    <div
                      onClick={() =>
                        props?.handleChangeTask(index, t?.title, "edit")
                      }
                      className={`
                      ${t?.isEdit ? "bg-yellow-300" : ""}
                      p-2 transition-all hover:bg-yellow-300 w-full h-full cursor-pointer rounded-md`}
                    >
                      {t?.isEdit ? (
                        <span>Cancelar</span>
                      ) : (
                        <i className={`bi bi-pen`}></i>
                      )}
                    </div>
                    {!t?.isEdit ? (
                      <div
                        onClick={
                          () =>
                            props?.setShowModal({
                              show: true,
                              index: index,
                              title: t?.title,
                              type: "delete",
                            })
                          // handleChangeTask(index, t?.title, "delete")
                        }
                        className="p-2 transition-all hover:bg-red-300 w-full h-full cursor-pointer rounded-md"
                      >
                        <i className={`bi bi-trash`}></i>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
          : null}
      </div>
    </div>
  );
};

export default ListTasks;
