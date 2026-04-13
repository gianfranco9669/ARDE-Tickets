export type EstadoEvento =
  | 'borrador'
  | 'programado'
  | 'publicado'
  | 'activo'
  | 'finalizado'
  | 'suspendido'
  | 'cancelado';

export type EstadoEntrada = 'emitida' | 'validada' | 'bloqueada' | 'anulada';

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

export type TipoEntradaEvento = {
  id: string;
  eventoId: string;
  nombre: string;
  tipo: string;
  precio: number;
  cupo: number;
  desde: string;
  hasta: string;
  horaDesde: string;
  horaHasta: string;
  limitePorCompra: number;
  reingresoPermitido: boolean;
  color: string;
  visible: boolean;
  observaciones?: string;
};

export type EntradaEmitida = {
  id: string;
  eventoId: string;
  tipoEntradaId: string;
  tipoEntradaNombre: string;
  titular: string;
  estado: EstadoEntrada;
  identificador: string;
  tokenSeguro: string;
  fechaEmision: string;
  historial: Array<{ accion: string; fecha: string }>;
};
