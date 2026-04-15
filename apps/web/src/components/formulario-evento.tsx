'use client';

import { CheckCircle2, Clock3, Megaphone, ReceiptText, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Evento } from '../types/evento';

type Props = {
  titulo: string;
  descripcion: string;
  evento?: Evento;
  modo: 'crear' | 'editar';
};

const estados = ['borrador', 'programado', 'publicado', 'activo', 'finalizado', 'suspendido', 'cancelado'];
const pasos = [
  { id: 1, titulo: 'Identidad', icono: Sparkles },
  { id: 2, titulo: 'Fecha y operación', icono: Clock3 },
  { id: 3, titulo: 'Comercialización', icono: ReceiptText },
  { id: 4, titulo: 'Publicación y branding', icono: Megaphone },
  { id: 5, titulo: 'Revisión final', icono: CheckCircle2 }
];

function fechaLocal(valor?: string) {
  if (!valor) return '';
  const d = new Date(valor);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
}

export function FormularioEvento({ titulo, descripcion, evento, modo }: Props) {
  const [paso, setPaso] = useState(1);

  const resumen = useMemo(
    () => ({
      nombre: evento?.nombre ?? 'Nuevo evento ARDE',
      inicio: evento?.inicioEn ? new Date(evento.inicioEn).toLocaleString('es-AR') : 'Sin definir',
      estado: evento?.estado ?? 'borrador',
      capacidad: evento?.capacidadTotal ?? 0
    }),
    [evento]
  );

  return (
    <section>
      <div className="header">
        <div>
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
        </div>
        <button>{modo === 'crear' ? 'Crear evento' : 'Guardar cambios'}</button>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 10 }}>
          {pasos.map((item) => {
            const Icono = item.icono;
            const activo = paso === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={activo ? '' : 'boton-secundario'}
                onClick={() => setPaso(item.id)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Icono size={16} /> {item.titulo}
              </button>
            );
          })}
        </div>
      </div>

      <form className="grid" style={{ gap: 18 }}>
        {paso === 1 && (
          <article className="card">
            <h3>Paso 1 · Identidad</h3>
            <div className="form-grid">
              <label>Nombre<input defaultValue={evento?.nombre} required /></label>
              <label>Subtítulo<input defaultValue={evento?.subtitulo} /></label>
              <label style={{ gridColumn: '1 / -1' }}>Descripción corta<textarea maxLength={280} defaultValue={evento?.descripcionCorta} /></label>
              <label style={{ gridColumn: '1 / -1' }}>Descripción completa<textarea rows={5} defaultValue={evento?.descripcionCompleta} /></label>
            </div>
          </article>
        )}

        {paso === 2 && (
          <article className="card">
            <h3>Paso 2 · Fecha y operación</h3>
            <div className="form-grid">
              <label>Apertura en<input type="datetime-local" defaultValue={fechaLocal(evento?.aperturaEn)} required /></label>
              <label>Inicio en<input type="datetime-local" defaultValue={fechaLocal(evento?.inicioEn)} required /></label>
              <label>Cierre en<input type="datetime-local" defaultValue={fechaLocal(evento?.cierreEn)} required /></label>
              <label>Estado
                <select defaultValue={evento?.estado ?? 'borrador'}>{estados.map((e) => <option key={e}>{e}</option>)}</select>
              </label>
              <label>Lugar<input defaultValue={evento?.lugar} required /></label>
              <label>Dirección<input defaultValue={evento?.direccion} required /></label>
            </div>
          </article>
        )}

        {paso === 3 && (
          <article className="card card-secundaria">
            <h3>Paso 3 · Comercialización</h3>
            <div className="form-grid">
              <label>Capacidad<input type="number" min={1} defaultValue={evento?.capacidadTotal} required /></label>
              <label>Edad mínima<input type="number" min={13} defaultValue={evento?.edadMinima ?? 18} required /></label>
              <label style={{ gridColumn: '1 / -1' }}>Observaciones internas<textarea rows={4} defaultValue={evento?.observacionesInternas} /></label>
            </div>
          </article>
        )}

        {paso === 4 && (
          <article className="card card-secundaria">
            <h3>Paso 4 · Publicación y branding</h3>
            <div className="form-grid">
              <label>Flyer principal<input type="file" accept="image/*" /></label>
              <label>Galería (opcional)<input type="file" accept="image/*" multiple /></label>
            </div>
          </article>
        )}

        {paso === 5 && (
          <article className="card">
            <h3>Paso 5 · Revisión final</h3>
            <p><strong>Evento:</strong> {resumen.nombre}</p>
            <p><strong>Inicio:</strong> {resumen.inicio}</p>
            <p><strong>Estado:</strong> {resumen.estado}</p>
            <p><strong>Capacidad:</strong> {resumen.capacidad}</p>
            <p className="texto-secundario">Validá los datos antes de confirmar. El sistema comprobará apertura &lt; inicio &lt; cierre.</p>
          </article>
        )}
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button type="button" className="boton-secundario" onClick={() => setPaso((p) => Math.max(1, p - 1))}>Anterior</button>
        <button type="button" onClick={() => setPaso((p) => Math.min(5, p + 1))}>Siguiente</button>
      </div>
    </section>
  );
}
