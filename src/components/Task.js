import { useState } from "react"
import { useEffect } from "react"
import "./Task.css"

function Task(props) {

    const [done, setDone] = useState(false)
    const [taskText, setTaskText] = useState(props.text)

    function deletFromArray() {
        props.deletetask(props.id)
    }

    function taskIsDone() {
        console.log(done)
        setDone(!done);
        props.isCompleted(done, props.id)
    }

    function textChanged(value) {
        setTaskText(value.target.value)
        props.handleEdit(taskText, props.id)
    }

    useEffect(() =>
        console.log("Log z tasku, upravená hodnota:", taskText)
    )

    return (
        
        <div>
            <div className="task">
                <input type="checkbox" name="doneCheckBox" className="doneButton" onClick={taskIsDone}></input>
                <input className="task_text" onChange={textChanged} type="text" value={taskText} />
                <button className="task_delete_button" onClick={deletFromArray}>X</button>
            </div>
        </div>
    )
}

export default Task