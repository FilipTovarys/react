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

    function moveUp() {
        props.moveTaskUpOrDown(props.id, - 1)
    }

    function moveDown() {
        props.moveTaskUpOrDown(props.id, + 1)
    }

    return (
        <div className="task">
            <input type="checkbox" name="doneCheckBox" className="doneButton" onClick={taskIsDone}></input>
            <input name="task_text" className="task_text" onChange={textChanged} onBlur={textChangedSendProps} type="text" value={taskText} />
            <div className="move_button_div">
                <button className="move_button" onClick={moveUp}>up</button>
                <button className="move_button" onClick={moveDown}>down</button>
            </div>
            <button className="task_delete_button" onClick={deletFromArray}>X</button>
        </div>   
    )
}

export default Task