import "./Task.css"

function Task(props) {
    
    return (
        <div className="task">
            <p>{props.description}</p>
            <button onClick={props.do}>Vymazat úkol</button>
        </div>
    )
}

export default Task