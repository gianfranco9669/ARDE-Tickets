'use client';

import { CheckCircle2, Clock3, Megaphone, ReceiptText, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Evento } from '../types/evento';

type Props = {
  titulo: string;
  descripcion: string;
  evento?: Evento;
  modo: 'crear' | 'editar';
};

type FormularioEventoState = {
  nombre: string;
  subtitulo: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  aperturaEn: string;
  inicioEn: string;
  cierreEn: string;
  estado: string;
  lugar: string;
  direccion: string;
  capacidadTotal: number;
  edadMinima: number;
  observacionesInternas: string;
};

const estados = [
  'borrador',
  'programado',
  'publicado',
  'activo',
  'finalizado',
  'suspendido',
  'cancelado'
];

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
  if (Number.isNaN(d.getTime())) return '';
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
}

export function FormularioEvento({ titulo, descripcion, evento, modo }: Props) {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formulario, setFormulario] = useState<FormularioEventoState>({
    nombre: evento?.nombre ?? '',
    subtitulo: evento?.subtitulo ?? '',
    descripcionCorta: evento?.descripcionCorta ?? '',
    descripcionCompleta: evento?.descripcionCompleta ?? '',
    aperturaEn: fechaLocal(evento?.aperturaEn),
    inicioEn: fechaLocal(evento?.inicioEn),
    cierreEn: fechaLocal(evento?.cierreEn),
    estado: evento?.estado ?? 'borrador',
    lugar: evento?.lugar ?? '',
    direccion: evento?.direccion ?? '',
    capacidadTotal: evento?.capacidadTotal ?? 1,
    edadMinima: evento?.edadMinima ?? 18,
    observacionesInternas: evento?.observacionesInternas ?? ''
  });

  function actualizar<K extends keyof FormularioEventoState>(
    campo: K,
    valor: FormularioEventoState[K]
  ) {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  }

  function siguientePaso() {
    setPaso((prev) => Math.min(5, prev + 1));
  }

  function anteriorPaso() {
    setPaso((prev) => Math.max(1, prev - 1));
  }

  const resumen = useMemo(() => {
    return {
      nombre: formulario.nombre || 'Nuevo evento ARDE',
      subtitulo: formulario.subtitulo || 'Sin subtítulo',
      apertura: formulario.aperturaEn
        ? new Date(formulario.aperturaEn).toLocaleString('es-AR')
        : 'Sin definir',
      inicio: formulario.inicioEn
        ? new Date(formulario.inicioEn).toLocaleString('es-AR')
        : 'Sin definir',
      cierre: formulario.cierreEn
        ? new Date(formulario.cierreEn).toLocaleString('es-AR')
        : 'Sin definir',
      estado: formulario.estado,
      capacidad: formulario.capacidadTotal,
      edadMinima: formulario.edadMinima,
      lugar: formulario.lugar || 'Sin definir',
      direccion: formulario.direccion || 'Sin definir'
    };
  }, [formulario]);

  async function manejarSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setGuardando(true);

    try {
      const payload = {
        nombre: formulario.nombre,
        subtitulo: formulario.subtitulo || undefined,
        descripcionCorta: formulario.descripcionCorta || undefined,
        descripcionCompleta: formulario.descripcionCompleta || undefined,
        aperturaEn: formulario.aperturaEn
          ? new Date(formulario.aperturaEn).toISOString()
          : '',
        inicioEn: formulario.inicioEn
          ? new Date(formulario.inicioEn).toISOString()
          : '',
        cierreEn: formulario.cierreEn
          ? new Date(formulario.cierreEn).toISOString()
          : '',
        estado: formulario.estado,
        lugar: formulario.lugar,
        direccion: formulario.direccion,
        capacidadTotal: Number(formulario.capacidadTotal),
        edadMinima: Number(formulario.edadMinima),
        observacionesInternas: formulario.observacionesInternas || undefined
      };

      const esEdicion = modo === 'editar' && evento?.id;
      const url = esEdicion
        ? `http://localhost:4001/api/eventos/${evento.id}`
        : 'http://localhost:4001/api/eventos';

      const method = esEdicion ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const texto = await response.text();
        throw new Error(texto || 'No se pudo guardar el evento.');
      }

      router.push('/eventos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al guardar.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section>
      <div className="header">
        <div>
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: 10
          }}
        >
          {pasos.map((item) => {
            const Icono = item.icono;
            const activo = paso === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={activo ? '' : 'boton-secundario'}
                onClick={() => setPaso(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <Icono size={16} />
                {item.titulo}
              </button>
            );
          })}
        </div>
      </div>

      <form className="grid" style={{ gap: 18 }} onSubmit={manejarSubmit}>
        {error ? (
          <div className="card" style={{ border: '1px solid #7f1d1d', color: '#fecaca' }}>
            <strong>Error:</strong> {error}
          </div>
        ) : null}

        {paso === 1 ? (
          <article className="card">
            <h3>Paso 1 · Identidad</h3>
            <div className="form-grid">
              <label>
                Nombre
                <input
                  value={formulario.nombre}
                  onChange={(e) => actualizar('nombre', e.target.value)}
                  required
                />
              </label>

              <label>
                Subtítulo
                <input
                  value={formulario.subtitulo}
                  onChange={(e) => actualizar('subtitulo', e.target.value)}
                />
              </label>

              <label style={{ gridColumn: '1 / -1' }}>
                Descripción corta
                <textarea
                  maxLength={280}
                  value={formulario.descripcionCorta}
                  onChange={(e) => actualizar('descripcionCorta', e.target.value)}
                />
              </label>

              <label style={{ gridColumn: '1 / -1' }}>
                Descripción completa
                <textarea
                  rows={5}
                  value={formulario.descripcionCompleta}
                  onChange={(e) => actualizar('descripcionCompleta', e.target.value)}
                />
              </label>
            </div>
          </article>
        ) : null}

        {paso === 2 ? (
          <article className="card">
            <h3>Paso 2 · Fecha y operación</h3>
            <div className="form-grid">
              <label>
                Apertura en
                <input
                  type="datetime-local"
                  value={formulario.aperturaEn}
                  onChange={(e) => actualizar('aperturaEn', e.target.value)}
                  required
                />
              </label>

              <label>
                Inicio en
                <input
                  type="datetime-local"
                  value={formulario.inicioEn}
                  onChange={(e) => actualizar('inicioEn', e.target.value)}
                  required
                />
              </label>

              <label>
                Cierre en
                <input
                  type="datetime-local"
                  value={formulario.cierreEn}
                  onChange={(e) => actualizar('cierreEn', e.target.value)}
                  required
                />
              </label>

              <label>
                Estado
                <select
                  value={formulario.estado}
                  onChange={(e) => actualizar('estado', e.target.value)}
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Lugar
                <input
                  value={formulario.lugar}
                  onChange={(e) => actualizar('lugar', e.target.value)}
                  required
                />
              </label>

              <label>
                Dirección
                <input
                  value={formulario.direccion}
                  onChange={(e) => actualizar('direccion', e.target.value)}
                  required
                />
              </label>
            </div>
          </article>
        ) : null}

        {paso === 3 ? (
          <article className="card card-secundaria">
            <h3>Paso 3 · Comercialización</h3>
            <div className="form-grid">
              <label>
                Capacidad
                <input
                  type="number"
                  min={1}
                  value={formulario.capacidadTotal}
                  onChange={(e) => actualizar('capacidadTotal', Number(e.target.value))}
                  required
                />
              </label>

              <label>
                Edad mínima
                <input
                  type="number"
                  min={13}
                  value={formulario.edadMinima}
                  onChange={(e) => actualizar('edadMinima', Number(e.target.value))}
                  required
                />
              </label>

              <label style={{ gridColumn: '1 / -1' }}>
                Observaciones internas
                <textarea
                  rows={4}
                  value={formulario.observacionesInternas}
                  onChange={(e) => actualizar('observacionesInternas', e.target.value)}
                />
              </label>
            </div>
          </article>
        ) : null}

        {paso === 4 ? (
          <article className="card card-secundaria">
            <h3>Paso 4 · Publicación y branding</h3>
            <div className="form-grid">
              <label>
                Flyer principal
                <input type="file" accept="image/*" />
              </label>

              <label>
                Galería (opcional)
                <input type="file" accept="image/*" multiple />
              </label>
            </div>
          </article>
        ) : null}

        {paso === 5 ? (
          <article className="card">
            <h3>Paso 5 · Revisión final</h3>

            <div className="form-grid">
              <div>
                <strong>Evento</strong>
                <p>{resumen.nombre}</p>
              </div>

              <div>
                <strong>Subtítulo</strong>
                <p>{resumen.subtitulo}</p>
              </div>

              <div>
                <strong>Apertura</strong>
                <p>{resumen.apertura}</p>
              </div>

              <div>
                <strong>Inicio</strong>
                <p>{resumen.inicio}</p>
              </div>

              <div>
                <strong>Cierre</strong>
                <p>{resumen.cierre}</p>
              </div>

              <div>
                <strong>Estado</strong>
                <p>{resumen.estado}</p>
              </div>

              <div>
                <strong>Capacidad</strong>
                <p>{resumen.capacidad}</p>
              </div>

              <div>
                <strong>Edad mínima</strong>
                <p>{resumen.edadMinima}</p>
              </div>

              <div>
                <strong>Lugar</strong>
                <p>{resumen.lugar}</p>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <strong>Dirección</strong>
                <p>{resumen.direccion}</p>
              </div>
            </div>

            <p className="texto-secundario" style={{ marginTop: 12 }}>
              Revisá todos los datos antes de confirmar.
            </p>
          </article>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <button
            type="button"
            className="boton-secundario"
            onClick={anteriorPaso}
            disabled={paso === 1}
          >
            Anterior
          </button>

          {paso < 5 ? (
            <button type="button" onClick={siguientePaso}>
              Siguiente
            </button>
          ) : (
            <button type="submit" disabled={guardando}>
              {guardando ? 'Guardando...' : modo === 'crear' ? 'Crear evento' : 'Guardar cambios'}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}