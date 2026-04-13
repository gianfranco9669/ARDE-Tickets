import { Evento } from '../types/evento';

type Props = {
  titulo: string;
  descripcion: string;
  evento?: Evento;
  modo: 'crear' | 'editar';
};

const estados = ['borrador', 'programado', 'publicado', 'activo', 'finalizado', 'suspendido', 'cancelado'];

export function FormularioEvento({ titulo, descripcion, evento, modo }: Props) {
  return (
    <section>
      <div className="header">
        <div>
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
        </div>
        <button>{modo === 'crear' ? 'Crear evento' : 'Guardar cambios'}</button>
      </div>

      <form className="grid" style={{ gap: 18 }}>
        <article className="card">
          <h3>Identidad del evento</h3>
          <div className="form-grid">
            <label>Nombre<input defaultValue={evento?.nombre} required /></label>
            <label>Subtítulo<input defaultValue={evento?.subtitulo} /></label>
            <label style={{ gridColumn: '1 / -1' }}>Descripción corta<textarea maxLength={280} defaultValue={evento?.descripcionCorta} /></label>
            <label style={{ gridColumn: '1 / -1' }}>Descripción completa<textarea rows={5} defaultValue={evento?.descripcionCompleta} /></label>
          </div>
        </article>

        <article className="card">
          <h3>Programación y operación</h3>
          <div className="form-grid">
            <label>Fecha<input type="date" defaultValue={evento?.fecha} required /></label>
            <label>Estado
              <select defaultValue={evento?.estado ?? 'borrador'}>{estados.map((e) => <option key={e}>{e}</option>)}</select>
            </label>
            <label>Horario de apertura<input type="time" defaultValue={evento?.horaApertura} required /></label>
            <label>Horario de inicio<input type="time" defaultValue={evento?.horaInicio} required /></label>
            <label>Horario de cierre<input type="time" defaultValue={evento?.horaCierre} required /></label>
            <label>Edad mínima<input type="number" min={13} defaultValue={evento?.edadMinima ?? 18} required /></label>
            <label>Capacidad<input type="number" min={1} defaultValue={evento?.capacidadTotal} required /></label>
          </div>
        </article>

        <article className="card card-secundaria">
          <h3>Ubicación y contenidos</h3>
          <div className="form-grid">
            <label>Lugar<input defaultValue={evento?.lugar} required /></label>
            <label>Dirección<input defaultValue={evento?.direccion} required /></label>
            <label>Flyer principal<input type="file" accept="image/*" /></label>
            <label>Galería (opcional)<input type="file" accept="image/*" multiple /></label>
            <label style={{ gridColumn: '1 / -1' }}>Observaciones internas<textarea rows={4} defaultValue={evento?.observacionesInternas} /></label>
          </div>
        </article>
      </form>
    </section>
  );
}
