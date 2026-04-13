export default function IngresoPage() {
  return (
    <section style={{ maxWidth: 980, margin: '40px auto' }}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
          <div style={{ background: 'linear-gradient(135deg, #3A1717, #1E222B)', padding: 36 }}>
            <small>ARDE · Control profesional de eventos</small>
            <h1 style={{ fontSize: 44, margin: '12px 0' }}>Acceso a ARDE</h1>
            <p className="texto-secundario">Ingreso flexible para operación real: producción, puerta, caja, RRPP y administración.</p>
            <ul>
              <li>Validaciones seguras y trazabilidad por rol.</li>
              <li>Inicio rápido para equipos en campo.</li>
              <li>Experiencia moderna, abierta y sin fricción.</li>
            </ul>
          </div>

          <div style={{ padding: 28 }}>
            <h2>Elegí cómo ingresar</h2>
            <div className="grid" style={{ marginTop: 14 }}>
              <button>Continuar con Google</button>
              <button className="boton-secundario">Ingresar con teléfono (OTP)</button>
              <button className="boton-secundario">Ingresar con mail (link mágico)</button>
              <button className="boton-secundario">Ingresar con mail (código)</button>
            </div>
            <hr style={{ margin: '20px 0' }} />
            <details>
              <summary>Acceso administrativo por credenciales</summary>
              <form className="grid" style={{ marginTop: 12 }}>
                <label>Correo administrativo<input type="email" required /></label>
                <label>Contraseña<input type="password" required /></label>
                <button type="submit" className="boton-secundario">Ingresar como administrador</button>
              </form>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
