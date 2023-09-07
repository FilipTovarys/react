import { useState } from "react"
import Task from "./components/Task.js"
import "./App.css"


export default function App() {

  const tasks = ["Vynést koš", "Vyklidit myčku", "Naučit se React", "Navolit si rozvrh"]
  
  const [showtasks, setShowtasks] = useState(true);

  function deleteTasks() {
    setShowtasks(false)
  }

  return (
    <div className="app">
      <h1>Todo list</h1>
      <div>
        {showtasks && (
        <div>
          {showtasks && <Task description={tasks[0]} />}
          {showtasks && <Task description={tasks[1]} />}
          {showtasks && <Task description={tasks[2]} />}
          {showtasks && <Task description={tasks[3]} />}
          <button onClick={deleteTasks}>Delete all tasks</button>
        </div>
        )}
      </div>
    </div>
  )
}