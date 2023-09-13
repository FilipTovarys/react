import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import Filters from "./components/Filters.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState([])
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [iscompleted, setIscompleted] = useState(false);
  const tasksLength = tasks.length;
  const [doneFilterButt, setDoneFilterButt] = useState(true)
  let moreThanTwoTasks = tasksLength >= 2;
  let moreThanOneTask = tasksLength >= 1;

  function deleteAllTasks() {
    setTasks([]);
  }

  useEffect(() =>
    console.log("render"),
  )

  function deleteTaskFromArray(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleInputData(input) {
    const newTask = {text: input, completed: iscompleted}
    setTasks([...tasks, newTask]);
  }

  function isDone(isDoneState, index) {
    console.log("Úkol:",{index} , "je dokončený" ,!isDoneState);
    setIscompleted(!isDoneState);
    let updatedTasks = [...tasks]
    updatedTasks[index].completed = !isDoneState;
    setTasks(updatedTasks)
  }

  function completedFilter() {
    setShowOnlyDone(!showOnlyDone)
    setDoneFilterButt(!doneFilterButt)
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
                showOnlyDone || onetask.completed ? (
                  <Task
                    key={index}
                    id={index}
                    text={onetask.text}
                    deletetask={deleteTaskFromArray}
                    isCompleted={isDone}
                  ></Task>
                ): null
              );
            })}
          </div>
          <div id="filters">
            {moreThanTwoTasks && (
              <button className="filter_button" onClick={deleteAllTasks}>Delete all</button>
            )}
            {moreThanOneTask && (
              <Filters text={doneFilterButt ? "Complete" : "All"} onClick={completedFilter}></Filters>
            )}
          </div>
      </div>
    </div>
  );  
}