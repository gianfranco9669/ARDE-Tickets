'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  id: string;
};

export function BotonEliminarEvento({ id }: Props) {
  const router = useRouter();
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function manejarEliminar() {
    const confirmar = window.confirm('¿Seguro que querés eliminar este evento?');
    if (!confirmar) return;

    try {
      setEliminando(true);
      setError(null);

      const response = await fetch(`http://localhost:4001/api/eventos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const texto = await response.text();
        throw new Error(texto || 'No se pudo eliminar el evento');
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al eliminar el evento');
    } finally {
      setEliminando(false);
    }
  }

  return (
    <div style={{ display: 'contents' }}>
      <button
        type="button"
        className="boton-secundario"
        onClick={manejarEliminar}
        disabled={eliminando}
        style={{ borderColor: '#7f1d1d', color: '#fecaca' }}
      >
        {eliminando ? 'Eliminando...' : 'Eliminar'}
      </button>

      {error ? (
        <p style={{ width: '100%', marginTop: 8, color: '#fecaca', fontSize: 13 }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}