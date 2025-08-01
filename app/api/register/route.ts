// app/api/register/route.ts
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    await sql`
      INSERT INTO users (email, password, role)
      VALUES (${email}, ${password}, 'user')
    `;
    return NextResponse.json({ message: "User registered" });
  } catch (err) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
}
