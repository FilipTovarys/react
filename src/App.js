import { useState } from "react"
import Task from "./components/Task.js"
import "./App.css"
import DeleteButton from "./components/DeleteButton.js"


export default function App() {

  const tasks = ["Vynést koš", "Vyklidit myčku", "Naučit se React", "Navolit si rozvrh"]
  
  const [showtask, setShowtask] = useState(true);

  function deleteTask() {
    setShowtask(false)
  }

  return (
    <div className="app">
      <h1>Todo list</h1>
      {showtask && <Task description={tasks[0]} do={deleteTask}/>}
      {showtask && <Task description={tasks[1]} do={deleteTask}/>}
      {showtask && <Task description={tasks[2]} do={deleteTask}/>}
      {showtask && <Task description={tasks[3]} do={deleteTask}/>}
    </div>
  )
}