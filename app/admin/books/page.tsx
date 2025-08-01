"use client";
import { useEffect, useState } from "react";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", price: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", price: "" });

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ title: "", author: "", price: "" });
    location.reload();
  }

  async function deleteBook(id: number) {
    await fetch("/api/books", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    location.reload();
  }

  function startEdit(book: any) {
    setEditId(book.id);
    setEditForm({ title: book.title, author: book.author, price: book.price });
  }

  async function saveEdit(id: number) {
    await fetch("/api/books", {
      method: "PUT",
      body: JSON.stringify({ id, ...editForm }),
    });
    setEditId(null);
    location.reload();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Manage Books
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Book</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book: any) => (
          <li
            key={book.id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {editId === book.id ? (
              <>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    value={editForm.author}
                    onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    value={editForm.price}
                    type="number"
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => saveEdit(book.id)} style={{ ...buttonStyle, backgroundColor: "#333" }}>
                    Simpan
                  </button>
                  <button onClick={() => setEditId(null)} style={{ ...buttonStyle, backgroundColor: "#aaa" }}>
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <strong style={{ fontSize: "1.1rem" }}>{book.title}</strong><br />
                  <span>{book.author}</span> — <span>Rp. {book.price}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => startEdit(book)} style={buttonStyle}>Edit</button>
                  <button onClick={() => deleteBook(book.id)} style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

const inputStyle = {
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  flex: "1 1 150px",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#000",
  color: "#fff",
  cursor: "pointer",
};
