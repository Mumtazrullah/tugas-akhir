// app/layout.tsx
import "./styles/global.css";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "e-Loak",
  description: "Elegant black & white app with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
