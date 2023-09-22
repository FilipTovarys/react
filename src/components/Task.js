import { useState } from "react"
import "./Task.css"

function Task(props) {

    const {task} = props

    const {text, id, completed} = task


    const onUpdate = (event) => {
        const name = event.target.name
        console.log("Update:", name,"id:", id)

    }


    return (
        <div className="task">
            <input 
                type="checkbox" 
                name="completed" 
                className="doneButton" 
                checked={completed} 
                onChange={onUpdate}>
            </input>
            <input 
                name="overwrite"
                className="task_text" 
                onChange={onUpdate} 
                onBlur={onUpdate} 
                type="text" 
                value={text}>
            </input> 
            <div className="move_button_div">
                <button name="up" className="move_button" onClick={onUpdate}>up</button>
                <button name="down" className="move_button" onClick={onUpdate}>down</button>
            </div>
            <button name="delete" className="task_delete_button" onClick={onUpdate}>X</button>
        </div>   
    )
}

export default Task