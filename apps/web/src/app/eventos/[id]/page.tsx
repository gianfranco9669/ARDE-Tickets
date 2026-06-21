import { notFound } from 'next/navigation';

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

async function obtenerEventoPorId(id: string): Promise<EventoApi | null> {
  const response = await fetch(`http://localhost:4001/api/eventos/${id}`, {
    cache: 'no-store'
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('No se pudo cargar el evento');

  return response.json();
}

export default async function DetalleEventoPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const evento = await obtenerEventoPorId(id);

  if (!evento) return notFound();

  return (
    <section>
      <div className="header">
        <div>
          <h1>{evento.nombre}</h1>
          <p>{evento.subtitulo}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={`/eventos/${evento.id}/tipos-entrada`}>
            <button className="boton-secundario">Tipos de entrada</button>
          </a>
          <a href={`/eventos/${evento.id}/entradas`}>
            <button className="boton-secundario">Entradas emitidas</button>
          </a>
          <a href={`/eventos/${evento.id}/editar`}>
            <button>Editar evento</button>
          </a>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <article className="card">
          <h3>Resumen operativo</h3>
          <p>{evento.descripcionCompleta ?? evento.descripcionCorta ?? 'Sin descripción'}</p>
          <p>
            <strong>Apertura:</strong> {new Date(evento.aperturaEn).toLocaleString('es-AR')}
          </p>
          <p>
            <strong>Inicio:</strong> {new Date(evento.inicioEn).toLocaleString('es-AR')}
          </p>
          <p>
            <strong>Cierre:</strong> {new Date(evento.cierreEn).toLocaleString('es-AR')}
          </p>
          <p>
            <strong>Lugar:</strong> {evento.lugar}
          </p>
          <p>
            <strong>Dirección:</strong> {evento.direccion}
          </p>
          <p>
            <strong>Capacidad:</strong> {evento.capacidadTotal}
          </p>
          <p>
            <strong>Edad mínima:</strong> {evento.edadMinima}+
          </p>
          <p>
            <strong>Estado:</strong> {evento.estado}
          </p>
          <p>
            <strong>Observaciones internas:</strong>{' '}
            {evento.observacionesInternas ?? 'Sin observaciones'}
          </p>
        </article>

        <article className="card">
          <h3>Actividad comercial</h3>
          <p>
            <strong>Ventas:</strong> Próximamente
          </p>
          <p>
            <strong>Accesos validados:</strong> Próximamente
          </p>
          <hr />
          <p>
            Este detalle ya quedó conectado al backend real de eventos. El siguiente paso es
            vincular tipos de entrada, entradas emitidas y métricas comerciales.
          </p>
        </article>
      </div>
    </section>
  );
}