import { sql } from "@/lib/db";
import "../../styles/global.css";

export default async function StationeryPage() {
  const items = await sql`SELECT * FROM stationery ORDER BY id DESC`;

  return (
    <main className="stationery-container">
      <h1 className="stationery-title">Koleksi Alat Tulis</h1>
      <div className="stationery-grid">
        {items.map((item: any) => (
          <div key={item.id} className="stationery-card">
            <div className="stationery-image">
              <div className="placeholder-image">
                <span className="image-text">Dalam Pengembangan</span>
              </div>
            </div>
            <div className="stationery-info">
              <h3>{item.name}</h3>
              <p><em>{item.brand}</em></p>
              <p className="stationery-price">Rp. {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
