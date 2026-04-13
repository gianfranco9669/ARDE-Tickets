'use client';

import { usePathname } from 'next/navigation';

const secciones = [
  {
    titulo: 'Operación',
    items: [
      { etiqueta: 'Inicio', ruta: '/inicio', icono: '🏟️' },
      { etiqueta: 'Eventos', ruta: '/eventos', icono: '🎫' },
      { etiqueta: 'Entradas QR', ruta: '/entradas-qr', icono: '🔐' },
      { etiqueta: 'Accesos', ruta: '/accesos', icono: '🚪' }
    ]
  },
  {
    titulo: 'Comercial',
    items: [
      { etiqueta: 'Tipos de entrada', ruta: '/entradas', icono: '🧩' },
      { etiqueta: 'Ventas', ruta: '/ventas', icono: '📈' },
      { etiqueta: 'RRPP', ruta: '/rrpp', icono: '🤝' },
      { etiqueta: 'Invitados', ruta: '/invitados', icono: '🎟️' }
    ]
  },
  {
    titulo: 'Finanzas',
    items: [{ etiqueta: 'Caja y gastos', ruta: '/caja', icono: '💳' }]
  },
  {
    titulo: 'Sistema',
    items: [
      { etiqueta: 'Reportes', ruta: '/reportes', icono: '📊' },
      { etiqueta: 'Configuración', ruta: '/configuracion', icono: '⚙️' }
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
            const activo = pathname === item.ruta || pathname.startsWith(`${item.ruta}/`);
            return (
              <a key={item.etiqueta} className={`menu-item ${activo ? 'activo' : ''}`} href={item.ruta}>
                <span>{item.icono}</span>
                {item.etiqueta}
              </a>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
