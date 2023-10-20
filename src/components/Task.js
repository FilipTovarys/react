import "./Task.css";

function Task(props) {
  const { task, onUpdate, onDelete, move } = props;
  const { text, id, completed } = task;

  return (
    <div className="task">
      <input
        type="checkbox"
        name="checkbox"
        className="doneButton"
        checked={completed}
        onChange={() => onUpdate({ ...task, completed: !completed })}
      ></input>
      <input
        name="overwrite"
        className="task_text"
        onChange={(event) => onUpdate({ ...task, text: event.target.value })}
        type="text"
        value={text}
      ></input>
      <div className="move_button_div">
        <button
          name="up"
          className="move_button"
          onClick={() => move(id, "up")}
        >
          up
        </button>
        <button
          name="down"
          className="move_button"
          onClick={() => move(id, "down")}
        >
          down
        </button>
      </div>
      <button
        name="delete"
        className="task_delete_button"
        onClick={() => onDelete(id)}
      >
        X
      </button>
    </div>
  );
}

export default Task;
