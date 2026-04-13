const metricas = [
  { label: 'Ventas netas', value: '$ 1.254.000', trend: '+18% vs semana anterior' },
  { label: 'Entradas emitidas', value: '2.450', trend: '72% de capacidad total' },
  { label: 'Accesos validados', value: '842', trend: '34% del total emitido' },
  { label: 'RRPP activos', value: '14', trend: '3 con alto rendimiento hoy' }
];

const actividad = [
  { icono: '✅', texto: 'Entrada ARDE-8F13A2 validada en Puerta Norte', hora: '15:01', tipo: 'Acceso' },
  { icono: '💸', texto: 'Venta presencial lote VIP Early x2', hora: '14:55', tipo: 'Venta' },
  { icono: '🧩', texto: 'Tipo de entrada "General Fase 3" actualizado', hora: '14:40', tipo: 'Configuración' },
  { icono: '🤝', texto: 'RRPP Camila R. superó meta diaria', hora: '14:12', tipo: 'RRPP' }
];

export default function InicioPage() {
  return (
    <section>
      <header className="header">
        <div>
          <h1>Inicio operativo</h1>
          <p>Vista ejecutiva para decidir rápido: evento activo, ingresos, accesos y pendientes críticos.</p>
        </div>
        <select style={{ maxWidth: 300 }} defaultValue="arde-opening-2026">
          <option value="arde-opening-2026">ARDE Opening 2026</option>
          <option value="arde-after">ARDE After Session</option>
        </select>
      </header>

      <section className="card hero-evento" style={{ marginBottom: 16 }}>
        <div className="flyer">Flyer protagonista</div>
        <div>
          <span className="estado advertencia">Publicado</span>
          <h2 style={{ marginBottom: 6 }}>ARDE Opening 2026</h2>
          <p className="texto-secundario">Sábado 18/04 · Apertura 21:00 · Inicio 22:00 · Estadio Central</p>
          <div className="grid grid-4" style={{ marginTop: 12 }}>
            <div><small>Ocupación</small><div className="metric">67%</div></div>
            <div><small>Ventas</small><div className="metric">$1.25M</div></div>
            <div><small>Accesos</small><div className="metric">842</div></div>
            <div><small>Cupo restante</small><div className="metric">1.050</div></div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button>Ver detalle</button>
            <button className="boton-secundario">Gestionar entradas</button>
            <button className="boton-secundario">Abrir control de accesos</button>
          </div>
        </div>
      </section>

      <section className="grid grid-4" style={{ marginBottom: 16 }}>
        {metricas.map((kpi) => (
          <article key={kpi.label} className="card kpi-card">
            <small>{kpi.label}</small>
            <div className="metric">{kpi.value}</div>
            <div className="trend">{kpi.trend}</div>
          </article>
        ))}
      </section>

      <section className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <article className="card">
          <h3>Actividad reciente</h3>
          {actividad.map((item) => (
            <div className="feed-item" key={`${item.hora}-${item.texto}`}>
              <div>{item.icono}</div>
              <div>
                <div>{item.texto}</div>
                <small>{item.tipo}</small>
              </div>
              <small>{item.hora}</small>
            </div>
          ))}
        </article>

        <article className="card card-secundaria">
          <h3>Alertas operativas</h3>
          <div className="alerta critica"><strong>Crítica:</strong> 2 validadores offline en puerta Norte.</div>
          <div className="alerta atencion"><strong>Atención:</strong> cupo VIP al 92%.</div>
          <div className="alerta pendiente"><strong>Pendiente:</strong> cierre de caja del evento anterior.</div>
          <div className="alerta info"><strong>Info:</strong> corte parcial de reporte RRPP disponible.</div>
          <button className="boton-secundario">Resolver alertas</button>
        </article>
      </section>
    </section>
  );
}
