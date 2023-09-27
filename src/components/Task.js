import "./Task.css"

function Task(props) {
    const {task, onUpdate, onDelete, move} = props
    const {text, id, completed} = task


    function handleUpdate(updatedTask) {
        onUpdate(updatedTask);
    }

    function handleDelete(deleteId) {
        onDelete(id);
    }

    function moveUp(id) {
        move(id, "up")
    }

    function moveDown(id) {
        move(id, "down")
    }

    return (
        <div className="task">
            <input 
                type="checkbox" 
                name="checkbox" 
                className="doneButton" 
                checked={completed} 
                onChange={() => handleUpdate({...task, completed: !completed })}>
            </input>
            <input 
                name="overwrite"
                className="task_text" 
                onChange={(event) => handleUpdate({ ...task, text: event.target.value })} 
                onBlur={() => handleUpdate(task)} 
                type="text" 
                value={text}>
            </input> 
            <div className="move_button_div">
                <button name="up" className="move_button" onClick={() => moveUp(id)}>up</button>
                <button name="down" className="move_button" onClick={() => moveDown(id)}>down</button>
            </div>
            <button name="delete" className="task_delete_button" onClick={handleDelete}>X</button>
        </div>   
    )
}

export default Task