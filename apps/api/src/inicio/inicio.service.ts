import { Injectable } from '@nestjs/common';

@Injectable()
export class InicioService {
  resumen() {
    return {
      eventoActivo: 'Fiesta ARDE Primavera',
      proximoEvento: '2026-04-18',
      ventasTotales: 1254000,
      accesosValidados: 842,
      alertas: ['Faltan 2 operadores en puerta norte', 'Pendiente cierre de caja evento anterior'],
      actividadReciente: ['Se acreditó RRPP Camila R.', 'Se creó lote VIP Early Bird'],
      metricas: { ocupacion: 67, validacionVsEmision: 81, conversionOnline: 24 }
    };
  }
}
