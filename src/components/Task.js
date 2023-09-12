import { useState } from "react"
import "./Task.css"

function Task(props) {

    const [done, setDone] = useState(false)

    function deletFromArray() {
        props.deletetask(props.id)
    }

    function taskIsDone() {
        setDone(!done);
    }

    return (
        <div>
            <div className="task">
                <button id="doneButton" onClick={taskIsDone}></button>
                <p>{props.text}</p>
                <button onClick={deletFromArray}>Delete task</button>
            </div>
        </div>
    )
}

export default Task