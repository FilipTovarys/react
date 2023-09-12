import { useState } from "react"
import "./Task.css"

function Task(props) {

    const [done, setDone] = useState(false)

    function deletFromArray() {
        props.deletetask(props.id)
    }

    function taskIsDone() {
        console.log(done)
        setDone(!done);
        props.isCompleted(done)
        console.log(props.text, "Is done:", done)
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