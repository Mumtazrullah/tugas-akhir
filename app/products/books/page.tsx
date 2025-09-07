import { sql } from "@/lib/db";
import "../../styles/global.css";

// Data selalu segar
export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await sql`SELECT * FROM books ORDER BY id DESC`;

  return (
    <main className="books-container">
      <h1 className="books-title">Koleksi Buku</h1>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1.5rem",
          }}
        >
          <thead>
            <tr style={{ background: "#111", color: "white", textAlign: "center" }}>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Judul</th>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Penulis</th>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Harga</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any) => (
              <tr key={book.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{book.title}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{book.author}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  Rp. {book.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
