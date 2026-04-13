import { notFound } from 'next/navigation';
import { obtenerEventoPorId } from '../../../lib/eventos-mock';

export default async function DetalleEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = obtenerEventoPorId(id);
  if (!evento) return notFound();

  return (
    <section>
      <div className="header">
        <div>
          <h1>{evento.nombre}</h1>
          <p>{evento.subtitulo}</p>
        </div>
        <a href={`/eventos/${evento.id}/editar`}><button>Editar evento</button></a>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <article className="card">
          <h3>Resumen operativo</h3>
          <p>{evento.descripcionCompleta ?? evento.descripcionCorta}</p>
          <p><strong>Fecha:</strong> {evento.fecha}</p>
          <p><strong>Horario:</strong> {evento.horaApertura} / {evento.horaInicio} / {evento.horaCierre}</p>
          <p><strong>Lugar:</strong> {evento.lugar}</p>
          <p><strong>Dirección:</strong> {evento.direccion}</p>
          <p><strong>Capacidad:</strong> {evento.capacidadTotal}</p>
          <p><strong>Edad mínima:</strong> {evento.edadMinima}+</p>
          <p><strong>Estado:</strong> {evento.estado}</p>
          <p><strong>Observaciones internas:</strong> {evento.observacionesInternas ?? 'Sin observaciones'}</p>
        </article>

        <article className="card">
          <h3>Métricas del evento</h3>
          <p><strong>Entradas emitidas:</strong> {evento.metricas?.entradasEmitidas ?? 0}</p>
          <p><strong>Accesos validados:</strong> {evento.metricas?.accesosValidados ?? 0}</p>
          <p><strong>Ventas:</strong> ${evento.metricas?.ventasTotales?.toLocaleString('es-AR') ?? 0}</p>
          <hr style={{ borderColor: '#2f3647' }} />
          <p>Este detalle queda preparado para conectar módulos dependientes por evento.</p>
        </article>
      </div>
    </section>
  );
}
