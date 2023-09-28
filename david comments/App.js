import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";
import useLocalStorage from "./components/useLocalStorage.js";


const getNextId = makeCounter()

export default function App() {
  // const [tasks, reorderTask, deleteTask] = useTasks();

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

  function handleCreateTask(text) {
    // let id = 0;
    // if (tasksLength > 0) {
    //   let currentTasks = [...tasks];
    //   let sortedIds = currentTasks.sort((a, b) => b.id - a.id);
    //   let highestId = sortedIds[0].id;
    //   id = highestId + 1;
    // } 
    const newTask = {id: getNextId(), order: 0, text: text, completed: false}
    const updatedTasks = [newTask, ...tasks].map((task, i) => ({...task, order: i}))
    setTasks(updatedTasks);
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
  

  /**
   * @param id {number}
   * @param direction {number} -1|+1
   */
  function moveTask(id, direction) {
    console.log("moooove")
    // const updatedTasks = [...tasks];
    const taskIndex = tasks.findIndex((task) => task.id === id);

    // Fail early "principle" (https://stackoverflow.com/questions/2807241/what-does-the-expression-fail-early-mean-and-when-would-you-want-to-do-so)
    if (direction === 'down' && taskIndex < tasksLength - 1) {
      return;
    }
    if (direction === 'up' && taskIndex < 0) {
      return;
    }

    const directionNumber = direction === 'up' ? -1 : 1;

      const movedTask = tasks[taskIndex];
      const taskAbove = tasks[taskIndex + directionNumber];

      console.log({movedTask, taskAbove, direction})

      const updatedTasks = tasks.map(task => {
        console.log('task', task)
        if (task.id === movedTask.id) {
          return {...task, order: taskAbove.order}
        }
        if (task.id === taskAbove.id) {
          return {...task, order: movedTask.order}
        }
        return task
      })

      // On immutability: https://www.digitalocean.com/community/tutorials/js-mutability
      const arr = [{foo: 'bar'}, {foo: 'baz'}]
      function mutatingArrayInPlaceByReference() {
        const bar = arr[0]

        // more code
        // more code
        // more code
        // more code
        // more code
        // more code

        bar.foo = 'foobar'

        return arr;
      }
      function iteratingAndReturningCompletelyNewArray() {
        return arr.map((obj, i) => {
          if (i === 0) {
            return {...obj, foo: 'foobar'}
          }
          return obj
        })
      }

      const updatedTask = []
      const movedTaskOrder = movedTask.order;
      movedTask.order = taskAbove.order;
      taskAbove.order = movedTaskOrder;

      // updatedTasks.sort((a, b) => a.order - b.order);

    // if (direction === "up" && taskIndex > 0) {
    //   const movedTask = updatedTask[taskIndex];
    //   const taskAbove = updatedTask[taskIndex + direction];

    //   const movedTaskOrder = movedTask.order;
    //   movedTask.order = taskAbove.order;
    //   taskAbove.order = movedTaskOrder;

    //   updatedTask.sort((a, b) => a.order - b.order);

    // } else if (direction === "down" && taskIndex < tasksLength - 1) {
    //   const movedTask = updatedTask[taskIndex];
    //   const taskBelow = updatedTask[taskIndex + 1];

    //   const movedTaskOrder = movedTask.order;
    //   movedTask.order = taskBelow.order;
    //   taskBelow.order = movedTaskOrder;

    //   updatedTask.sort((a, b) => a.order - b.order);
    // }

    setTasks(updatedTasks)
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
            .sort((a, b) => a.order - b.order) // Ordering in a single place only
            .filter(task => showOnlyDone || onetask.completed) //
            .map((onetask) => (
                  <Task
                    key={onetask.id}
                    task={onetask}
                    onUpdate={handleTaskUpdate}
                    onDelete={handleTaskDelete}
                    move={moveTask}
                  ></Task>
              )
            )}
            {/* .map((onetask) => {
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
            })} */}
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

  function makeCounter() {
    let count = 0
    return () => {
      // count = count ++
      return count++;  
    }
  }

