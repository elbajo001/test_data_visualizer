import React from "react";
import Tooltip from "../elements/Tooltip";

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

  const getLabelFilter = (id) => {
    switch (id) {
      case "done":
        return "completadas";
      case "pending":
        return "pendientes";
      default:
        break;
    }
  };

  const TooltipOptions = (props) => {
    const { handleOnEdit, handleOnDelete, handleOnChangePriority } = props;
    return (
      <div className="container_tooltip-options flex rounded-md absolute w-48 right-0 -top-1 bg-white ring-1 ring-gray-100 shadow-md flex-col">
        <div className="options_container-item flex flex-col gap-y-2 p-2">
          <div
            onClick={handleOnEdit}
            className={`px-2 py-[.25rem] md:py-2 text-slate-500 hover:text-slate-900 ring-1 hover:ring-orange-400 hover:bg-orange-100 ring-white transition-all flex gap-x-2 items-center w-full h-full cursor-pointer rounded-sm`}
          >
            <i className={`bi bi-pen flex items-center justify-center`}></i>{" "}
            <span>Editar</span>
          </div>
          <div
            onClick={handleOnDelete}
            className={`px-2 py-[.25rem] md:py-2 text-slate-500 hover:text-slate-900 ring-1 hover:ring-red-400 hover:bg-red-100 ring-white transition-all flex gap-x-2 items-center w-full h-full cursor-pointer rounded-sm`}
          >
            <i className={`bi bi-trash flex items-center justify-center`}></i>{" "}
            <span>Eliminar</span>
          </div>
          <div
            onClick={handleOnChangePriority}
            className={`px-2 py-[.25rem] md:py-2 text-slate-500 hover:text-slate-900 ring-1 hover:ring-blue-700 hover:bg-blue-100 ring-white transition-all flex gap-x-2 whitespace-nowrap overflow-hidden cursor-pointer items-center w-full h-full  rounded-sm`}
          >
            <i
              className={`bi bi-arrow-down-up flex items-center justify-center`}
            ></i>{" "}
            <span>Cambiar prioridad</span>
          </div>
        </div>
      </div>
    );
  };

  const handleOpenOptions = (task) => {
    const taskFound = props?.tasks?.tasks?.findIndex(
      (t) => t?.id?.toLowerCase() === task?.id?.toLowerCase()
    );
    if (taskFound >= 0) {
      let newTasks = props?.tasks?.tasks;
      newTasks = props?.closeOptions(task);
      props?.setTasks({ tasks: newTasks, random: Math.random() });
    }
  };

  return (
    <div className="container_list-tasks">
      <h4 className="font-semibold text-xl mb-2">Tus tareas</h4>
      <div className="mb-2 flex gap-2 px-4 z-10">
        <div
          onClick={() => {
            props?.filter === "all"
              ? props?.setOrderAsc(!props?.orderAsc)
              : props?.setFilter("all");
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
            props?.filter === "done"
              ? props?.setOrderAsc(!props?.orderAsc)
              : props?.setFilter("done");
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
            props?.filter === "pending"
              ? props?.setOrderAsc(!props?.orderAsc)
              : props?.setFilter("pending");
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
        {props?.tasksFiltered(
          props?.tasks?.tasks,
          props?.filter,
          props?.orderAsc
        )?.length ? (
          props
            ?.tasksFiltered(props?.tasks?.tasks, props?.filter, props?.orderAsc)
            ?.map((t, index) => (
              <div
                className="item-task flex gap-2 mb-2 justify-between items-center"
                key={index}
              >
                <form
                  onSubmit={props?.handleEdit}
                  style={{
                    backgroundColor: `${
                      false && !t?.isEdit
                        ? getColor(t?.priority?.color, false)
                        : "transparent"
                    }`,
                    border: `2.5px solid ${
                      !t?.isEdit
                        ? getColor(t?.priority?.color, true)
                        : "#f4f4f5"
                    }`,
                  }}
                  className={`
                    flex gap-2 p-2 w-full rounded-md transition-all
                  `}
                >
                  <input
                    type="checkbox"
                    name={`task_edit_${t?.id}`}
                    id={`task_edit_${t?.id}`}
                    disabled={t?.isEdit}
                    checked={t?.done}
                    onChange={() => {
                      props?.handleChangeTask(index, t?.id, t?.title, "check");
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
                      autoFocus
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
                  {!t?.isEdit ? (
                    <Tooltip
                      show={t?.openOptions}
                      className={
                        "transition-all group-hover:bg-slate-200 w-full h-full cursor-pointer rounded-md"
                      }
                      dataLabel={
                        <TooltipOptions
                          handleOnEdit={() => {
                            props.setFormData({
                              ...props?.formData,
                              id: t?.id,
                            });
                            props?.handleChangeTask(
                              index,
                              t?.id,
                              t?.title,
                              "edit"
                            );
                          }}
                          handleOnDelete={() =>
                            props?.setDataModal({
                              ...props?.dataModal,
                              show: true,
                              title:
                                "¿Estás seguro que quieres eliminar esta tarea?",
                              description: "No podrás deshacer este cambio",
                              cancelBtnText: "cancelar",
                              confirmBtnText: "eliminar",
                              task: {
                                id: t?.id,
                                index: index,
                                title: t?.title,
                                type: "delete",
                              },
                            })
                          }
                          handleOnChangePriority={() =>
                            props?.setDataModal({
                              ...props?.dataModal,
                              show: true,
                              cancelBtnText: "cancelar",
                              confirmBtnText: "Cambiar",
                              content: <></>,
                              task: {
                                id: t?.id,
                                index: index,
                                title: t?.title,
                                type: "priority",
                              },
                            })
                          }
                        />
                      }
                    >
                      <i
                        onClick={() => handleOpenOptions(t)}
                        className={`bi bi-three-dots m-auto px-2 py-3 flex justify-center items-center`}
                      ></i>
                    </Tooltip>
                  ) : (
                    <button
                      onClick={() =>
                        props?.handleChangeTask(index, t?.id, t?.title, "edit")
                      }
                      className="hover:bg-slate-100 h-full py-2 px-1 rounded-md hover:ring-2 hover:ring-slate-100"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))
        ) : (
          <p className="w-full my-0 py-4 font-semibold text-slate-700 text-center">
            Oops! No tienes tareas {getLabelFilter(props?.filter)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ListTasks;
