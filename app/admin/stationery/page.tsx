"use client";
import { useEffect, useState } from "react";

export default function AdminStationery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", price: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", brand: "", price: "" });

  useEffect(() => {
    fetch("/api/stationery")
      .then(res => res.json())
      .then(setItems);
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch("/api/stationery", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ name: "", brand: "", price: "" });
    location.reload();
  }

  async function deleteItem(id: number) {
    await fetch("/api/stationery", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    location.reload();
  }

  function startEdit(item: any) {
    setEditId(item.id);
    setEditForm({ name: item.name, brand: item.brand, price: item.price });
  }

  async function saveEdit(id: number) {
    await fetch("/api/stationery", {
      method: "PUT",
      body: JSON.stringify({ id, ...editForm }),
    });
    setEditId(null);
    location.reload();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Manage Stationery
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={e => setForm({ ...form, brand: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Item</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item: any) => (
          <li
            key={item.id}
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
            {editId === item.id ? (
              <>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <input
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    value={editForm.brand}
                    onChange={e => setEditForm({ ...editForm, brand: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    value={editForm.price}
                    type="number"
                    onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => saveEdit(item.id)} style={{ ...buttonStyle, backgroundColor: "#333" }}>
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
                  <strong style={{ fontSize: "1.1rem" }}>{item.name}</strong><br />
                  <span>{item.brand}</span> — <span>Rp. {item.price}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => startEdit(item)} style={buttonStyle}>Edit</button>
                  <button onClick={() => deleteItem(item.id)} style={{ ...buttonStyle, backgroundColor: "#b30000" }}>
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
