export default function NuevoEventoPage() {
  return (
    <section>
      <h1>Crear evento</h1>
      <p>Alta operativa completa con validaciones de negocio.</p>
      <form className="card form-grid">
        <label>Nombre<input required placeholder="ARDE Opening 2026" /></label>
        <label>Subtítulo<input placeholder="Edición otoño" /></label>
        <label>Fecha<input type="date" required /></label>
        <label>Estado
          <select defaultValue="borrador">
            <option>borrador</option><option>programado</option><option>publicado</option>
            <option>activo</option><option>finalizado</option><option>suspendido</option><option>cancelado</option>
          </select>
        </label>
        <label>Hora apertura<input type="time" required /></label>
        <label>Hora inicio<input type="time" required /></label>
        <label>Hora cierre<input type="time" required /></label>
        <label>Capacidad<input type="number" min={1} required /></label>
        <label>Edad mínima<input type="number" min={13} defaultValue={18} /></label>
        <label>Lugar<input required /></label>
        <label>Dirección<input required /></label>
        <label>Flyer principal<input type="file" accept="image/*" /></label>
        <label style={{ gridColumn: '1 / -1' }}>Descripción corta<textarea maxLength={280} /></label>
        <label style={{ gridColumn: '1 / -1' }}>Descripción completa<textarea rows={5} /></label>
        <div style={{ gridColumn: '1 / -1' }}><button type="submit">Guardar evento</button></div>
      </form>
    </section>
  );
}
