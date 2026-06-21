export default function Page() {
  return (
    <section>
      <div className="header">
        <div>
          <h1>Accesos</h1>
          <p>Control de validaciones y operación de ingreso por puerta/sector.</p>
        </div>
        <button>Escanear QR</button>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <article className="card">
          <h3>Panel de validación</h3>
          <p className="texto-secundario">Escaneo QR, ingreso manual y control de duplicados con historial inmediato.</p>
        </article>
        <article className="card card-secundaria">
          <h3>Estado operativo</h3>
          <p><span className="estado exito">Sistema en línea</span></p>
          <p><span className="estado advertencia">1 puerta con alta demanda</span></p>
        </article>
      </div>
    </section>
  );
}
