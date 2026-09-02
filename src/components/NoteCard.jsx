import React from "react";

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <small>Created/Updated: {note.timestamp}</small>

      <div className="note-actions">
        <button onClick={() => onEdit(note.id)}>
          Edit
        </button>

        <button onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;