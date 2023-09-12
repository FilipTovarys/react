import { useState } from "react";
import { useEffect } from 'react';
import Task from "./components/Task.js";
import Filters from "./components/Filters.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState([])
  const [showAllTasks, setShowAllTasks] = useState(true);
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [hotovej, setHotovej] = useState(true);
  const tasksLength = tasks.length;
  let moreThanTwoTasks = tasksLength >= 2;

  function deleteAllTasks() {
    setTasks([]);
  }

  function showSetter(bool) {
    setShowAllTasks(bool);
  }

  function deleteTaskFromTasks(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  useEffect(() => {
    console.log("Tasks:", tasks);
  });

  function handleInputData(input) {
    console.log("Input value:",input);
    setTasks([...tasks, input]);
  }

  function isDone(isDoneState) {
    console.log("Úkol je dokončený",isDoneState);
    setHotovej(isDoneState)
  }

  function completedFilter() {
    setShowOnlyDone(!showOnlyDone)
    console.log("zobrazuji jen dokončené úkoly:", showOnlyDone)
  }

  return (
    <div className="app">
      <h1>Todo list</h1>
      <Input showtask={showSetter} handleInput={handleInputData}/>
      <div>
        {showAllTasks && (
          <div>
            {tasks.map((onetask, index) => (true ? (
              onetask.isCompleted && (
                <Task 
                  key={index} 
                  id={index} 
                  text={onetask} 
                  deletetask={deleteTaskFromTasks} 
                  isCompleted={isDone}
                ></Task>
              )
            ) : (null)))}
          </div>
        )}
        {moreThanTwoTasks && (
        <button onClick={deleteAllTasks}>Delete all tasks</button>
        )}
      </div>
      <Filters onClick={completedFilter}></Filters>
    </div>
  )
}