import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState([])
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [doneFilterButt, setDoneFilterButt] = useState(true);
  const [tasksLeft, setTasksLeft] = useState(0)
  const [isAtLeastOneCompleted, setIsAtLeastOneCompleted] = useState(false)
  const tasksLength = tasks.length;
  const moreThanOneTask = tasksLength >= 1;

  const storedTasksJSON = localStorage.getItem("tasks");
  if (storedTasksJSON === null || storedTasksJSON === "[]") {
    console.log("empty local storage")
  } else {
    console.log("stored (21):", storedTasksJSON)
  }
  

  function deleteAllTasks() {
    setTasks([]);
  }

  useEffect(() => {
    console.log("render", tasks);
  })

  useEffect(() => {
    let notCompletedTasks = tasks.filter((task) => task.completed === false);
    let tasksLeft = notCompletedTasks.length;
    setTasksLeft(tasksLeft);

    let completedTasks = tasks.filter((task) => task.completed === true);
    let completedTasksCounter = completedTasks.length;
    completedTasksCounter >= 1 ? 
      setIsAtLeastOneCompleted(true) : 
        setIsAtLeastOneCompleted(false)

    let tasksJSON = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksJSON)
  }, [tasks])

  function deleteTaskFromArray(id) {
    let updatedTasks = [...tasks];
    updatedTasks = updatedTasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function handleInputData(input) {
    let id = 0;
    if (tasksLength > 0) {
      let currentTasks = [...tasks];
      let sortedIds = currentTasks.sort((a, b) => b.id - a.id);
      console.log("Sorted Ids:", sortedIds);
      let highestId = sortedIds[0].id;
      console.log("highest Id:", highestId);
      id = highestId + 1;
    } 

    const newTask = {id: id, text: input, completed: false}
    setTasks([newTask, ...tasks]);
  }

  function handleTaskEdit(updated_value, index_of_updated) {
    let updatedTasks = [...tasks];
    updatedTasks[index_of_updated].text = updated_value;
    setTasks(updatedTasks);
  }

  function isDone(doneId, bool) {
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
  }

  function moveTask(moveId, upOrDown) {
    const currentTasks = [...tasks];
    const movedTaskIndex = currentTasks.findIndex((task) => task.id === moveId);
    const movedTask = currentTasks.splice(movedTaskIndex, 1)[0];
    currentTasks.splice(movedTaskIndex + upOrDown, 0, movedTask);
    setTasks(currentTasks);
  }

  function deleteDoneTasks() {
    let currentTasks = [...tasks];
    let updatedTasks = currentTasks.filter((task) => task.completed === false)
    setTasks(updatedTasks)
  }

  function sortAb() {
    let sortedTasks = [...tasks]
    sortedTasks.sort((a, b) => a.text.localeCompare(b.text))
    setTasks(sortedTasks)
  }
  
  return (
    <div className="app">
      <h1>To-do list</h1>
      <Input handleInput={handleInputData} />
      <div id="under-input">
        {moreThanOneTask && (
          <button className="filter-button" onClick={sortAb}>Sort A-Z</button>
        )}
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
                    id={onetask.id}
                    text={onetask.text}
                    completed={onetask.completed}
                    deletetask={deleteTaskFromArray}
                    handleEdit={handleTaskEdit}
                    isCompleted={isDone}
                    moveTaskUpOrDown = {moveTask}
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