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
        props.isCompleted(done, props.id)
    }

    return (
        
        <div>
            <div className="task">
                <input type="checkbox" name="doneCheckBox" className="doneButton" onClick={taskIsDone}></input>
                <p>{props.text}</p>
                <button className="task_delete_button" onClick={deletFromArray}>X</button>
            </div>
        </div>
    )
}

export default Task