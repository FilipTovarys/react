import { useState } from "react"
import Task from "./components/Task.js"
import "./App.css"
import Input from "./components/Input.js"


export default function App() {

  let tasks = ["navolit rovzrh", "opravit kolo"]

  const [showtasks, setShowtasks] = useState(true);

  function deleteTasks() {
    setShowtasks(false)
  }

  function handleInputData(input) {
    console.log(input);
    tasks.push(input);
    console.log(tasks);
  }

  return (
    <div className="app">
      <h1>Todo list</h1>
      <Input handleInput={handleInputData}/>
      <div>
        {showtasks && (
        <div>
          {tasks.map((onetask, index) => (
            <Task key={index} text={onetask}></Task>
          ))}
          <button onClick={deleteTasks}>Delete all tasks</button>
        </div>
        )}
      </div>
    </div>
  )
}