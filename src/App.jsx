import React, { useState } from "react";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";

function App() {
  const [activeApp, setActiveApp] = useState("todo");

  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do & Notes App</h1>

        <p>Manage your tasks and notes in one place</p>

        <nav className="app-nav">
          <button
            className={activeApp === "todo" ? "active" : ""}
            onClick={() => setActiveApp("todo")}
          >
            To-Do
          </button>

          <button
            className={activeApp === "notes" ? "active" : ""}
            onClick={() => setActiveApp("notes")}
          >
            Notes
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeApp === "todo" ? <TodoApp /> : <NotesApp />}
      </main>
    </div>
  );
}

export default App;