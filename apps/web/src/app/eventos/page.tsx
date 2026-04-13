import { eventosMock } from '../../lib/eventos-mock';

export default function EventosPage() {
  return (
    <section>
      <div className="header">
        <div>
          <h1>Eventos</h1>
          <p>Administración central de eventos ARDE.</p>
        </div>
        <a href="/eventos/nuevo"><button>Crear evento</button></a>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <strong>Próximamente conectado:</strong> tipos de entrada, ventas, accesos, invitados, RRPP, caja, gastos y reportes por evento.
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        {eventosMock.map((evento) => (
          <article key={evento.id} className="card">
            <small>{evento.estado.toUpperCase()}</small>
            <h3>{evento.nombre}</h3>
            <p>{evento.subtitulo}</p>
            <p>{evento.fecha} · {evento.horaInicio} · {evento.lugar}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`/eventos/${evento.id}`}><button>Ver detalle</button></a>
              <a href={`/eventos/${evento.id}/editar`}><button style={{ background: '#374151' }}>Editar</button></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
