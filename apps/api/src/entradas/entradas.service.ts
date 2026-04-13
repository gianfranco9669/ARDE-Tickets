import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { EventoEntidad } from '../eventos/evento.entidad';
import { TipoEntradaEntidad } from '../tipos-entrada/tipo-entrada.entidad';
import { CrearEntradaDto } from './crear-entrada.dto';
import { EntradaEntidad } from './entrada.entidad';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(EntradaEntidad) private readonly entradasRepo: Repository<EntradaEntidad>,
    @InjectRepository(EventoEntidad) private readonly eventosRepo: Repository<EventoEntidad>,
    @InjectRepository(TipoEntradaEntidad) private readonly tiposRepo: Repository<TipoEntradaEntidad>
  ) {}

  async crear(dto: CrearEntradaDto) {
    const evento = await this.eventosRepo.findOneByOrFail({ id: dto.eventoId });
    const tipoEntrada = await this.tiposRepo.findOneByOrFail({ id: dto.tipoEntradaId });
    const idCorto = randomUUID().split('-')[0].toUpperCase();

    return this.entradasRepo.save(
      this.entradasRepo.create({
        identificador: `ARDE-${idCorto}`,
        tokenSeguro: randomUUID(),
        titular: dto.titular,
        evento,
        tipoEntrada,
        historial: [{ accion: 'emitida', fecha: new Date().toISOString() }]
      })
    );
  }

  obtenerEmitidas(eventoId?: string) {
    const where = eventoId ? { evento: { id: eventoId } } : {};
    return this.entradasRepo.find({
      where,
      relations: ['tipoEntrada', 'evento'],
      order: { fechaEmision: 'DESC' },
      take: 200
    });
  }
}
