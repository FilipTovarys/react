import "./DeleteButton.css"

function DeleteButton({onClick}) {
    return (
        <button onClick={onClick}>Delete task</button>
    )
}

export default DeleteButton