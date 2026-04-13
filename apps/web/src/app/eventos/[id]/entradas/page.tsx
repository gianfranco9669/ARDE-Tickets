import { notFound } from 'next/navigation';
import { obtenerEntradasPorEvento, obtenerEventoPorId } from '../../../../lib/eventos-mock';

export default async function EntradasEmitidasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = obtenerEventoPorId(id);
  if (!evento) return notFound();

  const entradas = obtenerEntradasPorEvento(id);

  return (
    <section>
      <div className="header">
        <div>
          <h1>Entradas emitidas · {evento.nombre}</h1>
          <p>Base operativa para validación QR y auditoría de historial.</p>
        </div>
      </div>

      <div className="card">
        <table style={{ width: '100%' }}>
          <thead>
            <tr><th align="left">Identificador</th><th align="left">Titular</th><th align="left">Tipo</th><th align="left">Estado</th><th align="left">Emisión</th></tr>
          </thead>
          <tbody>
            {entradas.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.identificador}</td>
                <td>{entrada.titular}</td>
                <td>{entrada.tipoEntradaNombre}</td>
                <td>{entrada.estado}</td>
                <td>{new Date(entrada.fechaEmision).toLocaleString('es-AR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
