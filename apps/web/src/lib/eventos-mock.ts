import { EntradaEmitida, Evento, TipoEntradaEvento } from '../types/evento';

export const eventosMock: Evento[] = [
  {
    id: 'arde-opening-2026',
    nombre: 'ARDE Opening 2026',
    subtitulo: 'Edición Otoño',
    descripcionCorta: 'Primera gran noche ARDE con producción expandida.',
    descripcionCompleta: 'Evento principal con line up internacional, sectores VIP, accesos por carriles y operación completa de caja.',
    fecha: '2026-04-18',
    horaApertura: '21:00',
    horaInicio: '22:00',
    horaCierre: '06:00',
    lugar: 'Estadio Central',
    direccion: 'Av. del Evento 1234, CABA',
    capacidadTotal: 3500,
    edadMinima: 18,
    estado: 'publicado',
    flyerPrincipal: '/uploads/flyer-ejemplo.jpg',
    galeria: [],
    observacionesInternas: 'Coordinar doble control en puerta norte.',
    metricas: { entradasEmitidas: 2450, accesosValidados: 842, ventasTotales: 1254000 }
  },
  {
    id: 'arde-after-session',
    nombre: 'ARDE After Session',
    subtitulo: 'Noche extendida',
    fecha: '2026-04-25',
    horaApertura: '23:00',
    horaInicio: '23:30',
    horaCierre: '07:00',
    lugar: 'Arena Sur',
    direccion: 'Ruta 9 km 44',
    capacidadTotal: 1200,
    edadMinima: 18,
    estado: 'programado',
    metricas: { entradasEmitidas: 420, accesosValidados: 0, ventasTotales: 312000 }
  }
];

export const tiposEntradaMock: TipoEntradaEvento[] = [
  {
    id: 'tipo-vip-opening',
    eventoId: 'arde-opening-2026',
    nombre: 'VIP Early',
    tipo: 'vip',
    precio: 78000,
    cupo: 400,
    desde: '2026-03-20',
    hasta: '2026-04-18',
    horaDesde: '00:00',
    horaHasta: '23:59',
    limitePorCompra: 4,
    reingresoPermitido: true,
    color: '#8b5cf6',
    visible: true
  },
  {
    id: 'tipo-general-opening',
    eventoId: 'arde-opening-2026',
    nombre: 'General Fase 2',
    tipo: 'general',
    precio: 36000,
    cupo: 2500,
    desde: '2026-03-25',
    hasta: '2026-04-18',
    horaDesde: '00:00',
    horaHasta: '23:59',
    limitePorCompra: 6,
    reingresoPermitido: false,
    color: '#ef4444',
    visible: true
  }
];

export const entradasEmitidasMock: EntradaEmitida[] = [
  {
    id: 'entrada-001',
    eventoId: 'arde-opening-2026',
    tipoEntradaId: 'tipo-vip-opening',
    tipoEntradaNombre: 'VIP Early',
    titular: 'Camila Rojas',
    estado: 'validada',
    identificador: 'ARDE-8F13A2',
    tokenSeguro: 'tk_4f9d9a1f8b2e',
    fechaEmision: '2026-04-02T21:10:00Z',
    historial: [
      { accion: 'emitida', fecha: '2026-04-02T21:10:00Z' },
      { accion: 'validada', fecha: '2026-04-18T23:04:00Z' }
    ]
  },
  {
    id: 'entrada-002',
    eventoId: 'arde-opening-2026',
    tipoEntradaId: 'tipo-general-opening',
    tipoEntradaNombre: 'General Fase 2',
    titular: 'Lucía Pereira',
    estado: 'emitida',
    identificador: 'ARDE-9B23D1',
    tokenSeguro: 'tk_7d8f1b2c3a4e',
    fechaEmision: '2026-04-11T18:44:00Z',
    historial: [{ accion: 'emitida', fecha: '2026-04-11T18:44:00Z' }]
  }
];

export function obtenerEventoPorId(id: string) {
  return eventosMock.find((evento) => evento.id === id);
}

export function obtenerTiposPorEvento(eventoId: string) {
  return tiposEntradaMock.filter((tipo) => tipo.eventoId === eventoId);
}

export function obtenerEntradasPorEvento(eventoId: string) {
  return entradasEmitidasMock.filter((entrada) => entrada.eventoId === eventoId);
}
