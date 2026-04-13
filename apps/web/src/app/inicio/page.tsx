const kpis = [
  { label: 'Evento activo', value: 'ARDE Opening 2026' },
  { label: 'Ventas totales', value: '$ 1.254.000' },
  { label: 'Accesos validados', value: '842' },
  { label: 'Ocupación', value: '67%' }
];

export default function InicioPage() {
  return (
    <section>
      <header className="header">
        <div>
          <h1>Inicio unificado</h1>
          <p>Resumen operativo y económico en tiempo real.</p>
        </div>
        <select style={{ maxWidth: 280 }} defaultValue="arde-opening-2026">
          <option value="arde-opening-2026">ARDE Opening 2026</option>
          <option value="arde-after">ARDE After Session</option>
        </select>
      </header>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2>Evento protagonista</h2>
        <p>ARDE Opening 2026 - Sábado 18/04 · Estadio Central · Estado: publicado</p>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        {kpis.map((kpi) => (
          <article key={kpi.label} className="card">
            <small>{kpi.label}</small>
            <div className="metric">{kpi.value}</div>
          </article>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <article className="card">
          <h3>Actividad reciente</h3>
          <ul>
            <li>15:12 - Alta de RRPP "Camila R" con comisión 8%</li>
            <li>15:01 - Validación manual ticket ARDE-8F13A2 en puerta Norte</li>
            <li>14:44 - Carga de gasto de producción: sonido principal</li>
          </ul>
        </article>
        <article className="card">
          <h3>Alertas</h3>
          <ul>
            <li>Faltan operadores en Puerta Norte</li>
            <li>Cierre de caja pendiente del evento anterior</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
