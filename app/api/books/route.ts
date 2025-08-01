// app/api/books/route.ts
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const books = await sql`SELECT * FROM books ORDER BY id DESC`;
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const { title, author, price } = await req.json();
  await sql`
    INSERT INTO books (title, author, price)
    VALUES (${title}, ${author}, ${price})
  `;
  return NextResponse.json({ message: "Book created" });
}

export async function PUT(req: Request) {
  const { id, title, author, price } = await req.json();
  await sql`
    UPDATE books
    SET title = ${title}, author = ${author}, price = ${price}
    WHERE id = ${id}
  `;
  return NextResponse.json({ message: "Book updated" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await sql`DELETE FROM books WHERE id = ${id}`;
  return NextResponse.json({ message: "Book deleted" });
}

