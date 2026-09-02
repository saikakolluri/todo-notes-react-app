import React from "react";

function TodoItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="task-item">
      <div>
        <span
          onClick={() => onToggle(task.id)}
          className={task.completed ? "completed" : ""}
        >
          {task.text}
        </span>

        <small>
          Status: {task.completed ? "Completed" : "Pending"}
        </small>
      </div>

      <div>
        <button onClick={() => onEdit(task.id)}>
          Edit
        </button>

        <button onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
