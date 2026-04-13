export type EstadoEvento =
  | 'borrador'
  | 'programado'
  | 'publicado'
  | 'activo'
  | 'finalizado'
  | 'suspendido'
  | 'cancelado';

export type Evento = {
  id: string;
  nombre: string;
  subtitulo?: string;
  descripcionCorta?: string;
  descripcionCompleta?: string;
  fecha: string;
  horaApertura: string;
  horaInicio: string;
  horaCierre: string;
  lugar: string;
  direccion: string;
  capacidadTotal: number;
  edadMinima: number;
  estado: EstadoEvento;
  flyerPrincipal?: string;
  galeria?: string[];
  observacionesInternas?: string;
  metricas?: {
    entradasEmitidas: number;
    accesosValidados: number;
    ventasTotales: number;
  };
};
