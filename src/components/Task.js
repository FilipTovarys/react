import { useState } from "react"
import "./Task.css"

function Task(props) {

    const [taskText, setTaskText] = useState(props.text)

    function deletFromArray() {
        props.deletetask(props.id)
    }

    function taskIsDone() {
        props.isCompleted(props.id, props.completed)
    }

    function textChanged(value) {
        setTaskText(value.target.value)
    }

    function textChangedSendProps() {
        props.handleEdit(taskText, props.id)
    }

    return (
        
        <div>
            <div className="task">
                <input type="checkbox" name="doneCheckBox" className="doneButton" onClick={taskIsDone}></input>
                <input name="task_text" className="task_text" onChange={textChanged} onBlur={textChangedSendProps} type="text" value={taskText} />
                <button className="task_delete_button" onClick={deletFromArray}>X</button>
            </div>
        </div>
    )
}

export default Task