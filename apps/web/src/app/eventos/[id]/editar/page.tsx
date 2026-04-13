import { notFound } from 'next/navigation';
import { FormularioEvento } from '../../../../../components/formulario-evento';
import { obtenerEventoPorId } from '../../../../../lib/eventos-mock';

export default async function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = obtenerEventoPorId(id);
  if (!evento) return notFound();

  return (
    <FormularioEvento
      titulo={`Editar ${evento.nombre}`}
      descripcion="Ajustá datos operativos y de comunicación manteniendo trazabilidad del evento."
      modo="editar"
      evento={evento}
    />
  );
}
