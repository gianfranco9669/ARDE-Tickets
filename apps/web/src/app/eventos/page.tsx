export default function EventosPage() {
  return (
    <section>
      <div className="header">
        <h1>Eventos</h1>
        <a href="/eventos/nuevo"><button>Crear evento</button></a>
      </div>
      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th align="left">Nombre</th><th align="left">Fecha</th><th align="left">Estado</th><th align="left">Capacidad</th></tr>
          </thead>
          <tbody>
            <tr><td>ARDE Opening 2026</td><td>18/04/2026</td><td>Publicado</td><td>3.500</td></tr>
            <tr><td>ARDE After Session</td><td>25/04/2026</td><td>Programado</td><td>1.200</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
