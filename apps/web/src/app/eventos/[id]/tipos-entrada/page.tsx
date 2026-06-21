import { notFound } from 'next/navigation';
import { obtenerEventoPorId, obtenerTiposPorEvento } from '../../../../lib/eventos-mock';

export default async function TiposEntradaEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = obtenerEventoPorId(id);
  if (!evento) return notFound();

  const tipos = obtenerTiposPorEvento(id);

  return (
    <section>
      <div className="header">
        <div>
          <h1>Tipos de entrada · {evento.nombre}</h1>
          <p>Gestioná segmentos comerciales y su operación de venta.</p>
        </div>
        <a href={`/eventos/${id}/tipos-entrada/nuevo`}><button>Nuevo tipo</button></a>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        {tipos.map((tipo) => (
          <article key={tipo.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{tipo.nombre}</h3>
              <span style={{ color: tipo.color }}>●</span>
            </div>
            <p>{tipo.tipo.toUpperCase()} · ${tipo.precio.toLocaleString('es-AR')}</p>
            <p>Cupo: {tipo.cupo} · Límite: {tipo.limitePorCompra} por compra</p>
            <p>Vigencia: {tipo.desde} a {tipo.hasta}</p>
            <p>Horario: {tipo.horaDesde} a {tipo.horaHasta}</p>
            <a href={`/eventos/${id}/tipos-entrada/${tipo.id}/editar`}><button className="boton-secundario">Editar</button></a>
          </article>
        ))}
      </div>
    </section>
  );
}
