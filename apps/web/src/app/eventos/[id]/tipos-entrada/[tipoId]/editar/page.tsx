import { notFound } from 'next/navigation';
import { FormularioTipoEntrada } from '../../../../../../components/formulario-tipo-entrada';
import { obtenerTiposPorEvento } from '../../../../../../lib/eventos-mock';

export default async function EditarTipoEntradaPage({ params }: { params: Promise<{ id: string; tipoId: string }> }) {
  const { id, tipoId } = await params;
  const tipoEntrada = obtenerTiposPorEvento(id).find((tipo) => tipo.id === tipoId);
  if (!tipoEntrada) return notFound();

  return <FormularioTipoEntrada modo="editar" eventoId={id} tipoEntrada={tipoEntrada} />;
}
