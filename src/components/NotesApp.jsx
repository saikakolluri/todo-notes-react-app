import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (event) => {
    event.preventDefault();

    if (!title.trim() && !content.trim()) return;

    const newNote = {
      id: Date.now(),
      title: title.trim() || "Untitled Note",
      content: content.trim(),
      timestamp: new Date().toLocaleString()
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );
  };

  const editNote = (id) => {
    const note = notes.find((item) => item.id === id);

    if (!note) return;

    const updatedTitle = window.prompt(
      "Edit note title:",
      note.title
    );

    if (updatedTitle === null) return;

    const updatedContent = window.prompt(
      "Edit note content:",
      note.content
    );

    if (updatedContent === null) return;

    setNotes((currentNotes) =>
      currentNotes.map((item) =>
        item.id === id
          ? {
              ...item,
              title: updatedTitle.trim() || "Untitled Note",
              content: updatedContent.trim(),
              timestamp: new Date().toLocaleString()
            }
          : item
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="notes-section">
      <h2>Notes App</h2>

      <form onSubmit={addNote} className="notes-form">
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows="5"
        />

        <button type="submit">Add Note</button>
      </form>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="notes-search"
      />

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={editNote}
              onDelete={deleteNote}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default NotesApp;