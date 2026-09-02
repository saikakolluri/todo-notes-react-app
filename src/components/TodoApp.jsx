import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();

    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const editTask = (id) => {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    const updatedText = window.prompt("Edit task:", task.text);

    if (updatedText && updatedText.trim()) {
      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === id
            ? { ...item, text: updatedText.trim() }
            : item
        )
      );
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <section className="todo-section">
      <h2>To-Do App</h2>

      <form onSubmit={addTask} className="todo-form">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="todo-filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
        <button onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default TodoApp;