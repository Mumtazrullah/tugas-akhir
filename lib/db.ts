// lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function sql<T = any>(strings: TemplateStringsArray, ...values: any[]): Promise<T[]> {
  const text = strings.reduce((prev, curr, i) => prev + `$${i}` + curr);
  const res = await pool.query(text, values);
  return res.rows as T[];
}
