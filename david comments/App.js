import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";

/**
 * Try to compute as many values as possible (try avoid using `useState` as much as possible) (calculating isAtLeastOneCompleted instead of tracking using `useState`)
 * Task component API simplifcation (accepts the whole task object and updates it using a single method)
 *   DRY (Don't Repat Yourself) and SRP (Single Responsibility Principle)
 * Create a custom `useStorage` hook that exposes the persisted state and a method to update it
 */

function makeCounter() {
  let count = 0;
  return () => {
    return `${count++}{Math.random().toString()}`;
  }
}

const getNextId = makeCounter();
// getNextId(); // 0
// getNextId(); // 1
// getNextId(); // 2


// class Counter {
//   count = 0;
//   getNextId() {
//     return this.count++;
//   }
// }

// const counter = new Counter();
// counter.getNextId(); // 0

export default function App() {

  // const [persistedState, persist] = useStorage("tasks", [])

  const [tasks , setTasks] = useState(getTasksFromLS)
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [doneFilterButt, setDoneFilterButt] = useState(true);
  const [tasksLeft, setTasksLeft] = useState(0)
  // const [isAtLeastOneCompleted, setIsAtLeastOneCompleted] = useState(false)
  const tasksLength = tasks.length;
  const moreThanOneTask = tasksLength >= 1;
  const completedTasks = tasks.filter((task) => task.completed === true);
  const isAtLeastOneCompleted = completedTasks.length >= 1;

  function getTasksFromLS() {
    let storedTasksJSON = localStorage.getItem("tasks")
    if (storedTasksJSON === null) {
      console.log("Empty tasks in localStorage")
      return []
    } else {
      console.log(storedTasksJSON)
      let storedTasks = JSON.parse(storedTasksJSON)
      return storedTasks
    }
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

    // let completedTasks = tasks.filter((task) => task.completed === true);
    let completedTasksCounter = completedTasks.length;
    // completedTasksCounter >= 1 ? 
    //   setIsAtLeastOneCompleted(true) : 
    //     setIsAtLeastOneCompleted(false) // TODO
    // setIsAtLeastOneCompleted(completedTasksCounter >= 1)

    let tasksJSON = JSON.stringify(tasks) // TODO
    localStorage.setItem("tasks", tasksJSON)
  }, [tasks])

  function deleteTaskFromArray(id) {
    // let updatedTasks = [...tasks]; // TODO
    // updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(tasks.filter((task) => task.id !== id));
    // setIsAtLeastOneCompleted(false)
  }

  function handleInputData(input) {
    const newTask = {id: getNextId(), text: input, completed: false}
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
    // TODO: Implement re-ordering using task.order
  }

  /**
  const tasks = [{
    id: 1,
    text: "Buy milk",
    order: 1,
  }, {
    id: 2,
    text: "Buy bread",
    order: 2,
  }]
 */

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
      <h1 className="text-3xl font-bold underline">To-do list</h1>
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
            {/* {tasks
            .sort()
            .filter(
              // Exclude completed, based on user's choice
            ).map(task => (
              <Task
                    key={task.id}
                    task={task}
                    onUpdated={(updatedTask) => {}}
               />
            ))} */}

            {tasks
            // .sort((a, b) => a.order - b.order)
            .map((onetask) => {
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