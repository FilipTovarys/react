import { useState } from "react";
import { useEffect } from 'react';
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState([])

  const [showtasks, setShowtasks] = useState(true);

  function deleteTasks() {
    setTasks([]);
  }

  function showSetter(bool) {
    setShowtasks(bool);
  }

  function delteTaskFromTasks(index) {
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
        {showtasks && (
        <div>
          {tasks.map((onetask, index) => (
            <Task key={index} id={index} text={onetask} deletetask={delteTaskFromTasks}></Task>
          ))}
        </div>
        )}
        <button onClick={deleteTasks}>Delete all tasks</button> 
      </div>
    </div>
  )
}