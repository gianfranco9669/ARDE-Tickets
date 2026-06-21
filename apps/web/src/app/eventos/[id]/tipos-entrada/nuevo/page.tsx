import { FormularioTipoEntrada } from '../../../../../components/formulario-tipo-entrada';

export default async function NuevoTipoEntradaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FormularioTipoEntrada modo="crear" eventoId={id} />;
}
