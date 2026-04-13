import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { EventoEntidad } from '../eventos/event.entity';
import { TipoEntradaEntidad } from '../tipos-entrada/entry-type.entity';
import { CrearTicketDto } from './create-ticket.dto';
import { TicketEntidad } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntidad) private readonly ticketsRepo: Repository<TicketEntidad>,
    @InjectRepository(EventoEntidad) private readonly eventosRepo: Repository<EventoEntidad>,
    @InjectRepository(TipoEntradaEntidad) private readonly tiposRepo: Repository<TipoEntradaEntidad>
  ) {}

  async crear(dto: CrearTicketDto) {
    const evento = await this.eventosRepo.findOneByOrFail({ id: dto.eventoId });
    const tipoEntrada = await this.tiposRepo.findOneByOrFail({ id: dto.tipoEntradaId });
    const idCorto = randomUUID().split('-')[0].toUpperCase();

    return this.ticketsRepo.save(
      this.ticketsRepo.create({
        identificador: `ARDE-${idCorto}`,
        tokenSeguro: randomUUID(),
        titular: dto.titular,
        evento,
        tipoEntrada,
        historial: [{ accion: 'emitido', fecha: new Date().toISOString() }]
      })
    );
  }
}
