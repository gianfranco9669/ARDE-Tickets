import Link from 'next/link';
import { BotonEliminarEvento } from '../../components/boton-eliminar-evento';

type EventoApi = {
  id: string;
  nombre: string;
  subtitulo?: string;
  descripcionCorta?: string;
  descripcionCompleta?: string;
  aperturaEn: string;
  inicioEn: string;
  cierreEn: string;
  estado: string;
  lugar: string;
  direccion: string;
  capacidadTotal: number;
  edadMinima: number;
  observacionesInternas?: string;
};

async function obtenerEventos(): Promise<EventoApi[]> {
  const response = await fetch('http://localhost:4001/api/eventos', {
    cache: 'no-store'
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(`No se pudieron cargar los eventos: ${response.status} ${texto}`);
  }

  return response.json();
}

export default async function EventosPage() {
  const eventos = await obtenerEventos();

  return (
    <section>
      <div className="header">
        <div>
          <h1>Eventos</h1>
          <p>Administración central de eventos ARDE Tickets.</p>
        </div>
        <Link href="/eventos/nuevo">
          <button>Crear evento</button>
        </Link>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <strong>Próximamente conectado:</strong> tipos de entrada, ventas, accesos, invitados,
        RRPP, caja, gastos y reportes por evento.
      </div>

      {eventos.length === 0 ? (
        <div className="card">
          <h3>No hay eventos cargados</h3>
          <p>Creá el primer evento para empezar a operar ARDE Tickets.</p>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          {eventos.map((evento) => (
            <article key={evento.id} className="card">
              <small>{evento.estado.toUpperCase()}</small>
              <h3>{evento.nombre}</h3>
              <p>{evento.subtitulo}</p>
              <p>
                {new Date(evento.inicioEn).toLocaleString('es-AR', {
                  dateStyle: 'short',
                  timeStyle: 'short'
                })}{' '}
                · {evento.lugar}
              </p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Link href={`/eventos/${evento.id}`}>
                  <button>Ver detalle</button>
                </Link>

                <Link href={`/eventos/${evento.id}/editar`}>
                  <button className="boton-secundario">Editar</button>
                </Link>

                <BotonEliminarEvento id={evento.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}