import { TipoEntradaEvento } from '../types/evento';

type Props = {
  modo: 'crear' | 'editar';
  eventoId: string;
  tipoEntrada?: TipoEntradaEvento;
};

const tipos = ['general', 'preventa', 'vip', 'mesa', 'backstage', 'free', 'invitacion', 'staff', 'prensa', 'combo'];

export function FormularioTipoEntrada({ modo, tipoEntrada }: Props) {
  return (
    <section>
      <div className="header">
        <div>
          <h1>{modo === 'crear' ? 'Nuevo tipo de entrada' : `Editar ${tipoEntrada?.nombre}`}</h1>
          <p>Definí condiciones comerciales y operativas con control de vigencia y cupo.</p>
        </div>
        <button>{modo === 'crear' ? 'Guardar tipo' : 'Actualizar tipo'}</button>
      </div>

      <form className="card form-grid">
        <label>Tipo
          <select defaultValue={tipoEntrada?.tipo ?? 'general'}>{tipos.map((tipo) => <option key={tipo}>{tipo}</option>)}</select>
        </label>
        <label>Nombre<input defaultValue={tipoEntrada?.nombre} required /></label>
        <label>Precio<input type="number" min={0} defaultValue={tipoEntrada?.precio} required /></label>
        <label>Cupo<input type="number" min={1} defaultValue={tipoEntrada?.cupo} required /></label>
        <label>Fecha desde<input type="date" defaultValue={tipoEntrada?.desde} required /></label>
        <label>Fecha hasta<input type="date" defaultValue={tipoEntrada?.hasta} required /></label>
        <label>Horario válido desde<input type="time" defaultValue={tipoEntrada?.horaDesde ?? '00:00'} /></label>
        <label>Horario válido hasta<input type="time" defaultValue={tipoEntrada?.horaHasta ?? '23:59'} /></label>
        <label>Límite por compra<input type="number" min={1} defaultValue={tipoEntrada?.limitePorCompra ?? 4} required /></label>
        <label>Color identificatorio<input type="color" defaultValue={tipoEntrada?.color ?? '#ef4444'} /></label>
        <label>Reingreso permitido
          <select defaultValue={String(tipoEntrada?.reingresoPermitido ?? false)}><option value="false">No</option><option value="true">Sí</option></select>
        </label>
        <label>Visibilidad
          <select defaultValue={String(tipoEntrada?.visible ?? true)}><option value="true">Visible</option><option value="false">Oculta</option></select>
        </label>
        <label style={{ gridColumn: '1 / -1' }}>Observaciones<textarea rows={4} defaultValue={tipoEntrada?.observaciones} /></label>
      </form>
    </section>
  );
}
