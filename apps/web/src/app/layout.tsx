import './globals.css';
import { Sidebar } from '../components/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
