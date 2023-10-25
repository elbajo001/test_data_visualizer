import React, { useState } from "react";

import data from './dataset.json';
import DataVisualizer from "./screens/DataVisualizer";
import ToDoTasks from "./screens/ToDoTasks";
import background from "./assets/Intersect2.svg"
import backgroundHexa from "./assets/Vector1.svg"

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
    <>
      <div className="container-app md:container-xl md:mx-auto max-h-screen p-2 md:p-4">
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
      <img src={background} alt="background" className="background-wave"/>
      <img src={backgroundHexa} alt="background" className="background-hexa"/>
    </>
  );
};

export default App;
