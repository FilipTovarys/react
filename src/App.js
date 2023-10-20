import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";
import useLocalStorage from "./components/useLocalStorage.js";
import { postRequest, deleteAllRequest, deleteTaskRequest, updateTaskRequest } from "./components/api.js";


//const getNextId = makeCounter()

export default function App() {
  const [tasks , setTasks] = useLocalStorage("tasks", []);
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [doneFilterButt, setDoneFilterButt] = useState(true);
  const tasksLeft = (tasks.filter((task) => task.completed === false)).length
  const completedTasks = tasks.filter((task) => task.completed === true)
  const isAtLeastOneCompleted = completedTasks.length > 0
  const tasksLength = tasks.length;
  const moreThanOneTask = tasksLength >= 1;


  function deleteAllTasks() {
    setTasks([]);
    deleteAllRequest()
  }

  useEffect(() => {
    console.log("render", tasks);
  })

  function handleCreateTask(input) {
    postRequest(input).then(id => {
      const newTask = {text: input, id: id, completed: false, order: 0}
      const updatedTasks = [newTask, ...tasks].map((task, i) => ({...task, order: i}))
      setTasks(updatedTasks);
    })
    .catch(error => {
      console.error("Chyba:", error);
    });
  }

  function completedFilter() {
    setShowOnlyDone(!showOnlyDone)
    setDoneFilterButt(!doneFilterButt)
  }

  function deleteDoneTasks() {
    let updatedTasks = tasks.filter((task) => task.completed === false)
    setTasks(updatedTasks)
  }

  function handleTaskUpdate(updatedTask) {
    let updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask
      }
      return task
    })
    setTasks(updatedTasks)
    updateTaskRequest(updatedTask)
  }

  function handleTaskDelete(id) {
    deleteTaskRequest(id)
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  }
  

  function moveTask(id, direction) {
    const movedTaskIndex = tasks.findIndex((task) => task.id === id);

    if (direction === "up" && movedTaskIndex === 0) {
      return;
    }
    if (direction === "down" && movedTaskIndex === tasksLength - 1) {
      return;
    }

    const directionNum = (direction === "up" ? -1 : +1);
    
    let updatedTask = tasks.map((task, i) => {
      if (i === movedTaskIndex) {
        return {...task, order: task.order + directionNum}
      } else if (i === (movedTaskIndex + directionNum))  {
        return {...task, order: task.order + (directionNum * (-1))}
      }
      return task;
    })
    
    setTasks(updatedTask)
  }


  return (
    <div className="app">
      <h1 className="text-3xl font-bold underline">To-do list</h1>
      <Input passInput={handleCreateTask} />
      <div id="under-input">
        {moreThanOneTask && (
          <p>{tasksLeft} task left</p>
        )}
      </div>
      <div>
          <div>
            {tasks
            .sort((a, b) => a.order - b.order)
            .map((onetask) => {
              return (
                showOnlyDone || onetask.completed ? (
                  <Task
                    key={onetask.id}
                    task={onetask}
                    onUpdate={handleTaskUpdate}
                    onDelete={handleTaskDelete}
                    move={moveTask}
                  ></Task>
                ): null
              );
            })}
          </div>
          <div id="filters">
              <button className={moreThanOneTask ? "filter-button" : "lifeless-filter-button"} onClick={deleteAllTasks}>Delete all</button>
              <button className={moreThanOneTask ? "filter-button" : "lifeless-filter-button"} onClick={completedFilter}>{doneFilterButt ? "Complete" : "All"}</button>
              <button className={isAtLeastOneCompleted ? "filter-button" : "lifeless-filter-button"} onClick={deleteDoneTasks}>Delete completed tasks</button>
          </div>
      </div>
    </div>
  );  
}

// function makeCounter() {
//   let count = 0
//   return () => {count ++
//     return count}
// }