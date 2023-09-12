import { useState } from "react";
import { useEffect } from 'react';
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState([])
  const [showTasks, setShowTasks] = useState(true);
  const tasksLength = tasks.length;
  let moreThanTwoTasks = tasksLength >= 2;

  function deleteAllTasks() {
    setTasks([]);
  }

  function showSetter(bool) {
    setShowTasks(bool);
  }

  function deleteTaskFromTasks(index) {
    let prvek = tasks[index]
    console.log("Mažu task:", {prvek})
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

  return (
    <div className="app">
      <h1>Todo list</h1>
      <Input showtask={showSetter} handleInput={handleInputData}/>
      <div>
        {showTasks && (
        <div>
          {tasks.map((onetask, index) => (
            <Task key={index} id={index} text={onetask} deletetask={deleteTaskFromTasks}></Task>
          ))}
        </div>
        )}
        {moreThanTwoTasks && (
        <button onClick={deleteAllTasks}>Delete all tasks</button>
        )}
      </div>
    </div>
  )
}