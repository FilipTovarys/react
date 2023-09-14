import { useState } from "react"
import { useEffect } from "react"
import "./Task.css"

function Task(props) {

    const [done, setDone] = useState("false")
    const [taskText, setTaskText] = useState(props.text)

    function deletFromArray() {
        props.deletetask(props.id)
    }

    function taskIsDone() {
        setDone(!done);
    }

    function textChanged(value) {
        setTaskText(value.target.value)
    }

    function textChangedSendProps() {
        props.handleEdit(taskText, props.id)
    }

    useEffect(() => {
        props.isCompleted(props.id);
    }, [done])

    return (
        
        <div>
            <div className="task">
                <input type="checkbox" name="doneCheckBox" className="doneButton" onClick={taskIsDone}></input>
                <input className="task_text" onChange={textChanged} onBlur={textChangedSendProps} type="text" value={taskText} />
                <button className="task_delete_button" onClick={deletFromArray}>X</button>
            </div>
        </div>
    )
}

export default Task