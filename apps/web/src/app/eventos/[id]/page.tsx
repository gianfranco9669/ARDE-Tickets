import { notFound } from 'next/navigation';
import { obtenerEntradasPorEvento, obtenerEventoPorId, obtenerTiposPorEvento } from '../../../lib/eventos-mock';

export default async function DetalleEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = obtenerEventoPorId(id);
  if (!evento) return notFound();

  const tipos = obtenerTiposPorEvento(id);
  const entradas = obtenerEntradasPorEvento(id);
  const entradasValidadas = entradas.filter((entrada) => entrada.estado === 'validada').length;

  return (
    <section>
      <div className="header">
        <div>
          <h1>{evento.nombre}</h1>
          <p>{evento.subtitulo}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={`/eventos/${evento.id}/tipos-entrada`}><button className="boton-secundario">Tipos de entrada</button></a>
          <a href={`/eventos/${evento.id}/entradas`}><button className="boton-secundario">Entradas emitidas</button></a>
          <a href={`/eventos/${evento.id}/editar`}><button>Editar evento</button></a>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        <article className="card"><small>Tipos activos</small><div className="metric">{tipos.length}</div></article>
        <article className="card"><small>Entradas emitidas</small><div className="metric">{entradas.length}</div></article>
        <article className="card"><small>Entradas validadas</small><div className="metric">{entradasValidadas}</div></article>
        <article className="card"><small>Validación</small><div className="metric">{entradas.length ? Math.round((entradasValidadas / entradas.length) * 100) : 0}%</div></article>
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
          <h3>Actividad comercial</h3>
          <p><strong>Ventas:</strong> ${evento.metricas?.ventasTotales?.toLocaleString('es-AR') ?? 0}</p>
          <p><strong>Accesos validados:</strong> {evento.metricas?.accesosValidados ?? 0}</p>
          <hr />
          <p>Este detalle ya opera conectado con tipos de entrada y entradas emitidas.</p>
        </article>
      </div>
    </section>
  );
}
