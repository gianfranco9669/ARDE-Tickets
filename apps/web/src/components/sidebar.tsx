const items = [
  { etiqueta: 'Inicio', ruta: '/inicio' },
  { etiqueta: 'Eventos', ruta: '/eventos' },
  { etiqueta: 'Tipos de entrada', ruta: '/entradas' },
  { etiqueta: 'Entradas QR', ruta: '/entradas-qr' },
  { etiqueta: 'Accesos', ruta: '/accesos' },
  { etiqueta: 'Ventas', ruta: '/ventas' },
  { etiqueta: 'RRPP', ruta: '/rrpp' },
  { etiqueta: 'Invitados y cortesías', ruta: '/invitados' },
  { etiqueta: 'Caja y gastos', ruta: '/caja' },
  { etiqueta: 'Reportes', ruta: '/reportes' },
  { etiqueta: 'Configuración', ruta: '/configuracion' }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>ARDE Plataforma</h2>
      <small>Gestión integral de eventos</small>
      <nav style={{ marginTop: 16 }}>
        {items.map((item) => (
          <a key={item.etiqueta} className="menu-item" href={item.ruta}>
            {item.etiqueta}
          </a>
        ))}
      </nav>
    </aside>
  );
}
