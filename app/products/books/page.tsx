import { sql } from "@/lib/db";
import "../../styles/global.css";

export default async function BooksPage() {
  const books = await sql`SELECT * FROM books ORDER BY id DESC`;

  return (
    <main className="books-container">
      <h1 className="books-title">Koleksi Buku</h1>
      <div className="book-grid">
        {books.map((book: any) => (
          <div key={book.id} className="book-card">
            <div className="book-image">
              <div className="placeholder-image">
                <span className="image-text">Foto dalam Pengembangan</span>
              </div>
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p><em>oleh {book.author}</em></p>
              <p className="book-price">Rp. {book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
