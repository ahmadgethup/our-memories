"use client";
import type { Memory } from "../../types";
import { IconUpload, IconExpand, IconTrash } from "../icons";

type Props = { memories: Memory[]; memoryTitle: string; setMemoryTitle: (s: string) => void; memoryDescription: string; setMemoryDescription: (s: string) => void; memoryImage: File | null; setMemoryImage: (f: File | null) => void; loading: boolean; addMemory: () => void; deleteMemory: (id: string) => void; setLightboxMemory: (memory: Memory) => void; };
export default function MemoriesPage({ memories, memoryTitle, setMemoryTitle, memoryDescription, setMemoryDescription, memoryImage, setMemoryImage, loading, addMemory, deleteMemory, setLightboxMemory }: Props) {
  return (
          <div className="tab-panel fade-up">
            <div className="form-card">
              <h2 className="form-title">Add a Memory</h2>
              <input
                type="text"
                placeholder="Memory title…"
                className="field"
                value={memoryTitle}
                onChange={(e) => setMemoryTitle(e.target.value)}
              />
              <textarea
                placeholder="A small description…"
                className="field field-ta"
                value={memoryDescription}
                onChange={(e) => setMemoryDescription(e.target.value)}
              />
              <label className="file-label">
                <span className="file-label-icon">
                  <IconUpload size={18} />
                </span>
                <span>
                  {memoryImage ? memoryImage.name : "Choose a photo…"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setMemoryImage(e.target.files?.[0] || null)}
                />
              </label>
              <button
                onClick={addMemory}
                disabled={loading}
                className="submit-btn"
              >
                {loading ? <span className="spinner" /> : "Save Memory"}
              </button>
            </div>

            <div className="cards-grid">
              {memories.map((m, i) => (
                <div
                  key={m.id}
                  className="memory-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div
                    className="memory-img-wrap"
                    onClick={() => setLightboxMemory(m)}
                  >
                    <img
                      src={m.image_url}
                      alt={m.title}
                      className="memory-img"
                    />
                    <div className="memory-img-overlay" />
                    <div className="memory-expand-hint">
                      <IconExpand size={18} />
                      <span>View full</span>
                    </div>
                  </div>
                  <div className="memory-body">
                    <h3 className="memory-title">{m.title}</h3>
                    {m.description && (
                      <p className="memory-desc">{m.description}</p>
                    )}
                    <p style={{color:"#ffb3c7",fontSize:"0.78rem",marginBottom:"0.4rem"}}>{m.created_by ? `Added by ${m.created_by}` : "Added before names were tracked"}</p>
                  <p className="memory-date">
                      {new Date(m.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <button
                      onClick={() => deleteMemory(m.id)}
                      className="delete-btn"
                    >
                      <IconTrash size={12} /> Delete
                    </button>
                  </div>
                  <div className="memory-card-glow" />
                </div>
              ))}
            </div>
          </div>
  );
}
