import { notFound } from 'next/navigation';
import { FormularioEvento } from '../../../../components/formulario-evento';
import type { Evento } from '../../../../types/evento';

async function obtenerEventoPorId(id: string): Promise<Evento | null> {
  const response = await fetch(`http://localhost:4001/api/eventos/${id}`, {
    cache: 'no-store'
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('No se pudo cargar el evento');

  return response.json();
}

export default async function EditarEventoPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const evento = await obtenerEventoPorId(id);

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