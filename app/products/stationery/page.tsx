import { sql } from "@/lib/db";
import "../../styles/global.css";

// Data selalu segar
export const dynamic = "force-dynamic";

export default async function StationeryPage() {
  const items = await sql`SELECT * FROM stationery ORDER BY id DESC`;

  return (
    <main className="stationery-container">
      <h1 className="stationery-title">Koleksi Alat Tulis</h1>
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
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Nama</th>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Merek</th>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Harga</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{item.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{item.brand}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  Rp. {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
