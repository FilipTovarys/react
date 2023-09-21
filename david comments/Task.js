import { useState } from "react"
import "./Task.css"

// function Task({ task: {
//     id,
//     text,
// } }) {
function Task(props) {
    // const {
    //     task,
    //     task: {
    //         text,
    //         completed,
    //     },
    //     onUpdated
    // } = props
    // // props.task
    // // props.onUpdated

    // // onUpdated({
    // //     ...props.task,
    // //     text: newText
    // // })

    // const [taskText, setTaskText] = useState(text) // TODO

    // function deletFromArray() {
    //     props.deletetask(props.id)
    // }

    function taskIsDone() {
        // onUpdated({
        //     ...task,
        //     completed: !completed
        // })
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
            <input type="checkbox" name="doneCheckBox" className="doneButton" checked={completed} onClick={taskIsDone} />
            <input
                name="task_text"
                className="task_text"
                type="text"
                value={taskText}
                onBlur={textChangedSendProps}
                onChange={({ target: { value } }) => setTaskText(value)}
            />
            <div className="move_button_div">
                <button className="move_button" onClick={moveUp}>up</button>
                <button className="move_button" onClick={moveDown}>down</button>
            </div>
            <button className="task_delete_button" onClick={deletFromArray}>X</button>
        </div>
    )
}

export default Task