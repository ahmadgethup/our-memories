"use client";
import type { Note } from "../../types";
import { IconTrash } from "../icons";

type Props = { notes: Note[]; noteContent: string; setNoteContent: (s: string) => void; addNote: () => void; deleteNote: (id: string) => void; };
export default function NotesPage({ notes, noteContent, setNoteContent, addNote, deleteNote }: Props) {
  return (
          <div className="tab-panel fade-up">
            <div className="form-card">
              <h2 className="form-title">Write a Note</h2>
              <textarea
                placeholder="Write something beautiful…"
                className="field field-ta tall"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
              <button onClick={addNote} className="submit-btn">
                Save Note
              </button>
            </div>

            <div className="notes-list">
              {notes.map((n, i) => (
                <div
                  key={n.id}
                  className="note-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="note-quote-mark"></div>
                  <p className="note-text">{n.content}</p>
                  <p style={{color:"#ffb3c7",fontSize:"0.78rem",marginBottom:"0.4rem"}}>{n.created_by ? `Added by ${n.created_by}` : "Added before names were tracked"}</p>
                  <div className="note-footer">
                    <span className="note-date">
                      {new Date(n.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="delete-btn"
                    >
                      <IconTrash size={12} /> Delete
                    </button>
                  </div>
                  <div className="note-line-accent" />
                </div>
              ))}
            </div>
          </div>
  );
}
