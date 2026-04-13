import { Evento } from '../types/evento';

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

export function obtenerEventoPorId(id: string) {
  return eventosMock.find((evento) => evento.id === id);
}
