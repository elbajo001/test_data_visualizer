import React, { useState } from "react";

import data from './dataset.json';
import DataVisualizer from "./screens/DataVisualizer";
import ToDoTasks from "./screens/ToDoTasks";

const screens = [
  { id: 'data_visualizer', title: 'Datos estadísticos'},
  { id: 'todo_tasks', title: 'Lista de tareas'}
]

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('todo_tasks')

  const handleChangeScreen = () => {
    if (currentScreen === 'data_visualizer') setCurrentScreen('todo_tasks')
    else setCurrentScreen('data_visualizer')
  }

  return (
    <div className="container-app md:container md:mx-auto max-h-screen p-2 md:p-4">
      {currentScreen === 'data_visualizer' ?
        <DataVisualizer
          data={data}
          title={screens?.find(s => s?.id === currentScreen)?.title}
          onChangeBtn={handleChangeScreen}
        />
      :
        <ToDoTasks
          title={screens?.find(s => s?.id === currentScreen)?.title}
          onChangeBtn={handleChangeScreen}
        />
      }
    </div>
  );
};

export default App;
