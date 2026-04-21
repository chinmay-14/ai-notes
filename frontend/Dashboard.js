import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 🔥 Your Backend URL
const API = "https://ai-notes-f6da.onrender.com";

function Dashboard() {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);
    const userId = localStorage.getItem('userId');

    // ✅ Fetch Notes
    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${API}/get-notes/${userId}`);
            setNotes(res.data);
        } catch (err) {
            console.log("Error fetching notes");
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // ✅ Add Note
    const addNote = async () => {
        if (!note.trim()) {
            alert("Write something first!");
            return;
        }

        try {
            await axios.post(`${API}/add-note`, {
                userId,
                content: note
            });

            setNote('');
            fetchNotes();
        } catch (err) {
            alert("Error adding note");
        }
    };

    // ✅ Delete Note
    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API}/delete-note/${id}`);
            fetchNotes();
        } catch (err) {
            alert("Error deleting note");
        }
    };

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
            
            <h2 style={{ textAlign: "center" }}>📝 Your Notes</h2>

            {/* INPUT SECTION */}
            <div style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                marginBottom: "30px"
            }}>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write your note here..."
                    style={{
                        width: "100%",
                        height: "100px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    onClick={addNote}
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        background: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    ➕ Add Note
                </button>
            </div>

            {/* NOTES LIST */}
            <div>
                {notes.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No notes yet...</p>
                ) : (
                    notes.map((n) => (
                        <div
                            key={n.id}
                            style={{
                                background: "#fff",
                                padding: "15px",
                                borderRadius: "10px",
                                marginBottom: "15px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            }}
                        >
                            <p>{n.content}</p>

                            <button
                                onClick={() => deleteNote(n.id)}
                                style={{
                                    marginTop: "10px",
                                    padding: "6px 12px",
                                    background: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                🗑 Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;