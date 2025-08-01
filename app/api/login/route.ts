import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // Validasi login atau sesuatu
  return NextResponse.json({ message: "Login berhasil" });
}
