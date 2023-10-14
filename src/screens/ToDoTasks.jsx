import React, { useState } from "react";
import Modal from "../components/Modal";

const ToDoTasks = (props) => {
  const [tasks, setTasks] = useState({
    tasks: [],
    random: "",
  });
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    done: false,
    isEdit: false,
    title: "",
    titleEdit: "",
  });

  const handleSubmit = (event) => {
    event?.preventDefault();
    if (!formData?.title) return;
    setTasks({ ...tasks, tasks: [...tasks?.tasks, formData] });
    setFormData({
      done: false,
      isEdit: false,
      title: "",
      titleEdit: formData?.title,
    });
  };

  const handleEdit = (event) => {
    event?.preventDefault();
    if (!formData?.titleEdit) return;
    let taskFound = tasks?.tasks[formData?.index];
    if (taskFound) {
      let newTasks = tasks?.tasks;
      newTasks[taskFound?.index] = {
        done: taskFound?.done,
        title: formData?.titleEdit,
        titleEdit: "",
        isEdit: false,
      };
      setTasks({ tasks: newTasks, random: Math.random() });
    }
  };

  const handleChangeTask = (index, title, type) => {
    const taskFound = tasks?.tasks?.findIndex(
      (t) => t?.title?.toLowerCase() === title?.toLowerCase()
    );
    if (taskFound >= 0) {
      let newTasks = tasks?.tasks;
      switch (type) {
        case "check":
          newTasks[taskFound] = {
            done: !newTasks[taskFound]?.done,
            title: title,
            titleEdit: "",
            isEdit: false,
          };
          break;
        case "delete":
          newTasks = newTasks?.filter(
            (t) => t?.title?.toLowerCase() !== title?.toLowerCase()
          );
          break;
        case "edit":
          newTasks[taskFound] = {
            done: newTasks[taskFound]?.done,
            title: newTasks[taskFound]?.title,
            titleEdit: title,
            isEdit: !newTasks[taskFound]?.isEdit,
            index: index,
          };
          setFormData({ ...formData, index: index, titleEdit: title });
          break;
        default:
          break;
      }
      setTasks({ tasks: newTasks, random: Math.random() });
    }
  };

  const handleChangeInput = (value) => {
    value = value?.replace(/\s+/g, " ");
    if (value === " ") return;
    setFormData({ ...formData, title: value });
  };

  const tasksFiltered = (tasks, tab) => {
    switch (tab) {
      case "done":
        return tasks?.filter((t) => t?.done);
      case "pending":
        return tasks?.filter((t) => !t?.done);
      default:
        return tasks;
    }
  };

  return (
    <div className="container-todo-tasks">
      <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 flex justify-between items-center leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
        <h1 className="my-0 text-xl uppercase font-extrabold">
          {props?.title}
        </h1>
        <button
          onClick={() => props?.onChangeBtn && props?.onChangeBtn()}
          className="btn ms-auto flex justify-end py-2 px-6 bg-teal-500  text-white rounded-md font-semibold tracking-wide shadow-black pointer hover:bg-teal-400 hover:shadow-md transition-all"
        >
          Cambiar
        </button>
      </div>
      <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
        {!tasks?.tasks?.length ? (
          <h4 className="font-semibold text-xl mb-2">Crea tu primer tarea!</h4>
        ) : null}
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <label htmlFor="title">Título *</label>
          <div className="flex justify-between gap-2 mb-4 my-2">
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="Título de la tarea"
              maxLength={"255"}
              className="outline-none ring-2 rounded-md py-2 px-4 ring-zinc-100 w-full"
              value={formData?.title ?? undefined}
              onChange={(e) => handleChangeInput(e?.target?.value)}
            />
            <button
              type="submit"
              className="btn ms-auto flex justify-end p-2 bg-teal-500  text-white rounded-md font-semibold tracking-wide shadow-black pointer hover:bg-teal-400 hover:shadow-md transition-all"
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </form>
      </div>
      {tasks?.tasks?.length ? (
        <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
          <h4 className="font-semibold text-xl mb-2">Tus tareas</h4>
          <div className="mb-2 flex gap-2 px-4 z-10">
            <div
              onClick={() => setFilter("all")}
              className={`
                  ${filter === "all" ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-500"}
                  py-2 px-4 font-semibold flex justify-center cursor-pointer rounded-md items-center text-white transition-all
                `}
            >
              Todas
            </div>
            <div
              onClick={() => setFilter("done")}
              className={`
                  ${filter === "done" ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-500"}
                  py-2 px-4 font-semibold flex justify-center cursor-pointer rounded-md items-center text-white transition-all
                `}
            >
              Completadas
            </div>
            <div
              onClick={() => setFilter("pending")}
              className={`
                  ${filter === "pending" ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-500"}
                  py-2 px-4 font-semibold flex justify-center cursor-pointer rounded-md items-center text-white transition-all
                `}
            >
              Pendientes
            </div>
          </div>
          <div className="container_list-tasks ring-1 p-1 pt-4 lg:px-4 rounded-md ring-gray-200 mt-[-0.750rem] -z-10 block">
            {tasksFiltered(tasks?.tasks, filter)?.map((t, index) => (
              <div
                className="item-task flex gap-2 mb-2 justify-between items-center"
                key={index}
              >
                <form
                  onSubmit={handleEdit}
                  className={`
                    ${t?.done ? "ring-lime-300" : "ring-slate-50"} 
                    ${t?.done ? "bg-lime-50" : "bg-slate-50"} 
                    ${t?.isEdit ? "ring-2 ring-zinc-100 bg-inherit" : ""} 
                    flex gap-2 p-2 w-full rounded-md ring-1 transition-all
                  `}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    disabled={t?.isEdit}
                    defaultChecked={
                      tasks?.tasks?.find(
                        (task) =>
                          task?.title?.toLowerCase() === t?.title?.toLowerCase()
                      )?.open
                    }
                    checked={
                      tasks?.tasks?.find(
                        (task) =>
                          task?.title?.toLowerCase() === t?.title?.toLowerCase()
                      )?.open
                    }
                    onChange={() => {
                      handleChangeTask(index, t?.title, "check");
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
                      className="outline-none w-full"
                      maxLength={"255"}
                      value={formData?.titleEdit}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          titleEdit: e?.target?.value,
                        })
                      }
                    />
                  )}
                </form>
                <div className="flex justify-between items-center h-full">
                  <div
                    onClick={() => handleChangeTask(index, t?.title, "edit")}
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
                      onClick={() =>
                        setShowModal({
                          show: true,
                          index: index,
                          title: t?.title,
                          type: "delete"
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
            ))}
          </div>
        </div>
      ) : null}
      {showModal?.show ?
        <Modal
          setShowModal={setShowModal}
          handleDelete={() =>
            handleChangeTask(showModal?.index, showModal?.title, showModal?.type)
          }
        />
      : null }
    </div>
  );
};

export default ToDoTasks;
