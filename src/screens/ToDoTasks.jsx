import React, { useState } from "react";
import Modal from "../components/Modal";
import FormTasks from "../components/FormTasks";
import ListTasks from "../components/ListTasks";

const priorityOptions = [
  {
    id: "high",
    label: "Alta",
    color: "red",
    order: "2"
  },
  {
    id: "medium",
    label: "Media",
    color: "orange",
    order: "1"
  },
  {
    id: "low",
    label: "Baja",
    color: "yellow",
    order: "0"
  },
];

const ToDoTasks = (props) => {
  // UseStates
  const [tasks, setTasks] = useState({
    tasks: [],
    random: "",
  });
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(true);
  const [orderAsc, setOrderAsc] = useState(true);
  const [formData, setFormData] = useState({
    done: false,
    isEdit: false,
    title: "",
    titleEdit: "",
    priority: "",
  });

  // UseEffects

  // Functions
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
            priority: newTasks[taskFound]?.priority,
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
            priority: newTasks[taskFound]?.priority,
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

  const handleChangePriority = (value) => {
    if (value === "") return;
    setFormData({ ...formData, priority: value });
  };

  const tasksFiltered = (tasks, tab, priority) => {
    let tasksAux = [...tasks]
    tasksAux = orderListByAsc(tasksAux, priority)
    switch (tab) {
      case "done":
        return tasksAux?.filter((t) => t?.done);
      case "pending":
        return tasksAux?.filter((t) => !t?.done);
      default:
        return tasksAux;
    }
  };

  const orderListByAsc = (data, isAsc) => {
    return data.slice().sort((a, b) => {
      if (!isAsc) return parseInt(a.priority.order) - parseInt(b.priority.order);
      else return parseInt(b.priority.order) - parseInt(a.priority.order);
    });
  }

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
        <FormTasks
          handleSubmit={handleSubmit}
          formData={formData}
          handleChangeInput={handleChangeInput}
          handleChangePriority={handleChangePriority}
          priorityOptions={priorityOptions}
        />
      </div>
      {tasks?.tasks?.length ? (
        <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
          <ListTasks
            tasks={tasks}
            orderAsc={orderAsc}
            filter={filter}
            formData={formData}
            setFilter={setFilter}
            setOrderAsc={setOrderAsc}
            handleChangeTask={handleChangeTask}
            tasksFiltered={tasksFiltered}
            handleEdit={handleEdit}
            setShowModal={setShowModal}
            setFormData={setFormData}
          />
        </div>
      ) : null}
      {showModal?.show ? (
        <Modal
          setShowModal={setShowModal}
          handleDelete={() =>
            handleChangeTask(
              showModal?.index,
              showModal?.title,
              showModal?.type
            )
          }
        />
      ) : null}
    </div>
  );
};

export default ToDoTasks;
