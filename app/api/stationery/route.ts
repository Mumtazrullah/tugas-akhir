// app/api/stationery/route.ts
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await sql`SELECT * FROM stationery ORDER BY id DESC`;
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { name, brand, price } = await req.json();
  await sql`
    INSERT INTO stationery (name, brand, price)
    VALUES (${name}, ${brand}, ${price})
  `;
  return NextResponse.json({ message: "Item created" });
}

export async function PUT(req: Request) {
  const { id, name, brand, price } = await req.json();
  await sql`
    UPDATE stationery
    SET name = ${name}, brand = ${brand}, price = ${price}
    WHERE id = ${id}
  `;
  return NextResponse.json({ message: "Item updated" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await sql`DELETE FROM stationery WHERE id = ${id}`;
  return NextResponse.json({ message: "Item deleted" });
}
