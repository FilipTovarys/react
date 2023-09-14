import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import Filters from "./components/Filters.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState([])
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [doneFilterButt, setDoneFilterButt] = useState(true);
  const tasksLength = tasks.length;
  let moreThanTwoTasks = tasksLength >= 2;
  let moreThanOneTask = tasksLength >= 1;

  function deleteAllTasks() {
    setTasks([]);
  }

  useEffect(() =>
    console.log("render", tasks)
  )

  function deleteTaskFromArray(id) {
    let updatedTasks = [...tasks]
    console.log("deletet task id:", id)
    updatedTasks = updatedTasks.filter((task) => task.id !== id)
    setTasks(updatedTasks);
  }

  function handleInputData(input) {
    let id = 0
    if (tasks.length > 0) {
      id = tasks[0].id + 1
    }
    const newTask = {id: id, text: input, completed: false}
    setTasks([newTask, ...tasks]);
  }

  function handleTaskEdit(updated_value, index_of_updated) {
    console.log("edit handled, value:", updated_value, "index:", index_of_updated);
    let updatedTasks = [...tasks];
    updatedTasks[index_of_updated].text = updated_value;
    setTasks(updatedTasks);
  }

  function isDone(doneId, bool) {
    console.log(doneId)
    let currentTasks = [...tasks];
    let updatedTasks = currentTasks.map((oneTask) => {
      if (oneTask.id === doneId) {
        return {...oneTask, completed: !bool};
      }
      return oneTask;
    });
    setTasks(updatedTasks)
  }

  function completedFilter() {
    setShowOnlyDone(!showOnlyDone)
    setDoneFilterButt(!doneFilterButt)
    console.log("zobrazuji jen dokončené úkoly:", showOnlyDone)
  }

  
  return (
    <div className="app">
      <h1>To-do list</h1>
      <Input handleInput={handleInputData} />
      <div>
          <div>
            {tasks.map((onetask) => {
              return (
                showOnlyDone || onetask.completed ? (
                  <Task
                    key={onetask.id}
                    id={onetask.id}
                    text={onetask.text}
                    completed={onetask.completed}
                    deletetask={deleteTaskFromArray}
                    handleEdit={handleTaskEdit}
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