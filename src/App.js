import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import Filters from "./components/Filters.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState([])
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [iscompleted, setIscompleted] = useState(true);
  const tasksLength = tasks.length;
  let moreThanTwoTasks = tasksLength >= 2;

  function deleteAllTasks() {
    setTasks([]);
  }

  useEffect(() =>
    console.log("render")
  )

  function deleteTaskFromArray(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleInputData(input) {
    const newTask = {text: input, iscompleted: false}
    setTasks([...tasks, newTask]);
  }

  function isDone(isDoneState, index) {
    console.log("Úkol:",{index} , "je dokončený" ,!isDoneState);
    console.log("Log z line 37, tasks:", tasks)
    setIscompleted(!isDoneState);
    let updatedTasks = [...tasks]
    updatedTasks[index].iscompleted = iscompleted
    console.log("Log z line 40, tasks",tasks)
  }

  function completedFilter() {
    setShowOnlyDone(!showOnlyDone)
    console.log("zobrazuji jen dokončené úkoly:", showOnlyDone)
  }

  
  return (
    <div className="app">
      <h1>Todo list</h1>
      <Input handleInput={handleInputData} />
      <div>
          <div>
            {tasks.map((onetask, index) => {
              return (
                <Task
                  key={index}
                  id={index}
                  text={onetask.text}
                  deletetask={deleteTaskFromArray}
                  isCompleted={isDone}
                ></Task>
              );
            })}
          </div>
        
        {moreThanTwoTasks && (
          <button onClick={deleteAllTasks}>Delete all tasks</button>
        )}
      </div>
      <Filters onClick={completedFilter}></Filters>
    </div>
  );  
}