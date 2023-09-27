import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";
import useLocalStorage from "./components/useLocalStorage.js";


export default function App() {
  const [tasks , setTasks] = useLocalStorage("tasks", [])
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [doneFilterButt, setDoneFilterButt] = useState(true);
  const tasksLeft = (tasks.filter((task) => task.completed === false)).length
  const completedTasks = tasks.filter((task) => task.completed === true)
  const isAtLeastOneCompleted = completedTasks.length > 0
  const tasksLength = tasks.length;
  const moreThanOneTask = tasksLength >= 1;


  function deleteAllTasks() {
    setTasks([]);
  }

  useEffect(() => {
    console.log("render", tasks);
  })

  function handleInputData(input) {
    let id = 0;
    if (tasksLength > 0) {
      let currentTasks = [...tasks];
      let sortedIds = currentTasks.sort((a, b) => b.id - a.id);
      let highestId = sortedIds[0].id;
      id = highestId + 1;
    } 
    const newTask = {id: id, order: id, text: input, completed: false}
    setTasks([newTask, ...tasks]);
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
  }

  function handleTaskDelete(id) {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  }
  

  function moveTask(id, direction) {
    console.log("moooove")
    const updatedTask = [...tasks];
    const taskIndex = updatedTask.findIndex((task) => task.id === id);

    if (direction === "up" && taskIndex > 0) {
      const movedTask = updatedTask[taskIndex];
      const taskAbove = updatedTask[taskIndex - 1];

      const movedTaskOrder = movedTask.order;
      movedTask.order = taskAbove.order;
      taskAbove.order = movedTaskOrder;

      updatedTask.sort((a, b) => a.order - b.order);

    } else if (direction === "down" && taskIndex < tasksLength - 1) {
      const movedTask = updatedTask[taskIndex];
      const taskBelow = updatedTask[taskIndex + 1];

      const movedTaskOrder = movedTask.order;
      movedTask.order = taskBelow.order;
      taskBelow.order = movedTaskOrder;

      updatedTask.sort((a, b) => a.order - b.order);
    }

    setTasks(updatedTask)
  }


  return (
    <div className="app">
      <h1 className="text-3xl font-bold underline">To-do list</h1>
      <Input passInput={handleInputData} />
      <div id="under-input">
        {moreThanOneTask && (
          <p>{tasksLeft} task left</p>
        )}
      </div>
      <div>
          <div>
            {tasks.map((onetask) => {
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