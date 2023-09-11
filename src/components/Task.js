import "./Task.css"

function Task(props) {

    function deletFromArray() {
        props.deletetask(props.id)
    }

    return (
        <div>
            <div className="task">
                <p>{props.text}</p>
                <button onClick={deletFromArray}>Delete task</button>
            </div>
        </div>
    )
}

export default Task