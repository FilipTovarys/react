import "./Task.css"
import { useState } from "react"

function Task(props) {

    const [show, setShowTask] = useState(true);

    function showTask() {
        setShowTask(false)
    }
    
    return (
        <div>
            {show && (
            <div className="task">
                {show && <p>{props.description}</p>}
                {show && <button onClick={showTask}>Delete task</button>}
            </div>)} 
        </div>
    )
}

export default Task