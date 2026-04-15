'use client';

import {
  BarChart3,
  CalendarDays,
  CreditCard,
  DoorOpen,
  Handshake,
  Home,
  Settings,
  ShieldCheck,
  Tags,
  Ticket,
  Users
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const secciones = [
  {
    titulo: 'Operación',
    items: [
      { etiqueta: 'Inicio', ruta: '/inicio', icono: Home },
      { etiqueta: 'Eventos', ruta: '/eventos', icono: CalendarDays },
      { etiqueta: 'Entradas QR', ruta: '/entradas-qr', icono: ShieldCheck },
      { etiqueta: 'Accesos', ruta: '/accesos', icono: DoorOpen }
    ]
  },
  {
    titulo: 'Comercial',
    items: [
      { etiqueta: 'Tipos de entrada', ruta: '/entradas', icono: Tags },
      { etiqueta: 'Ventas', ruta: '/ventas', icono: BarChart3 },
      { etiqueta: 'RRPP', ruta: '/rrpp', icono: Handshake },
      { etiqueta: 'Invitados', ruta: '/invitados', icono: Users }
    ]
  },
  {
    titulo: 'Finanzas',
    items: [{ etiqueta: 'Caja y gastos', ruta: '/caja', icono: CreditCard }]
  },
  {
    titulo: 'Sistema',
    items: [
      { etiqueta: 'Reportes', ruta: '/reportes', icono: Ticket },
      { etiqueta: 'Configuración', ruta: '/configuracion', icono: Settings }
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="marca-sidebar">
        <div className="marca-punto" />
        <div>
          <h2>ARDE Tickets</h2>
          <small>Ticketing y control operativo</small>
        </div>
      </div>

      {secciones.map((seccion) => (
        <div key={seccion.titulo} className="grupo-sidebar">
          <p className="titulo-grupo">{seccion.titulo}</p>
          {seccion.items.map((item) => {
            const Icono = item.icono;
            const activo = pathname === item.ruta || pathname.startsWith(`${item.ruta}/`);
            return (
              <a key={item.etiqueta} className={`menu-item ${activo ? 'activo' : ''}`} href={item.ruta}>
                <Icono size={16} />
                {item.etiqueta}
              </a>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
