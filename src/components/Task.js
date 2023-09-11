import "./Task.css"
import { useState } from "react"

function Task(props) {

    const [show, setShowTask] = useState(true);

    function showTask() {
        setShowTask(false)
        deleteFromTasks()
    }
    
    function deleteFromTasks() {
        console.log("teď smazat z pole tasks tento task")
    }

    return (
        <div>
            {show && (
            <div className="task">
                <p>{props.text}</p>
                <button onClick={showTask}>Delete task</button>
            </div>)} 
        </div>
    )
}

export default Task