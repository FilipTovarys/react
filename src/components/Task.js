import { useState } from "react"
import "./Task.css"

function Task(props) {

    const [done, setDone] = useState(false)

    function deletFromArray() {
        props.deletetask(props.id)
    }

    function taskIsDone() {
        setDone(!done);
        props.isCompleted(done, props.id)
    }

    return (
        
        <div>
            <div className="task">
                <input type="checkbox" id="doneButton" onClick={taskIsDone}></input>
                <p>{props.text}</p>
                <button onClick={deletFromArray}>Delete task</button>
            </div>
        </div>
    )
}

export default Task