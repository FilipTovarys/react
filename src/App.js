import { useState } from "react"
import Task from "./components/Task.js"
import "./App.css"
import Input from "./components/Input.js"


export default function App() {

  const tasks = ["Vynést koš", "Vyklidit myčku", "Naučit se React", "Navolit si rozvrh"]
  
  const [showtasks, setShowtasks] = useState(true);

  function deleteTasks() {
    setShowtasks(false)
  }

  function handleInputData(input) {
    console.log(input)
  }

  return (
    <div className="app">
      <h1>Todo list</h1>
      <Input handleInput={handleInputData}/>
      <div>
        {showtasks && (
        <div>
          <Task description={tasks[0]} />
          <Task description={tasks[1]} />
          <Task description={tasks[2]} />
          <Task description={tasks[3]} />
          <button onClick={deleteTasks}>Delete all tasks</button>
        </div>
        )}
      </div>
    </div>
  )
}