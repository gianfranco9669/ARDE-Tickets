import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntidad } from '../eventos/event.entity';
import { TipoEntradaEntidad } from '../tipos-entrada/entry-type.entity';
import { TicketEntidad } from './ticket.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntidad, EventoEntidad, TipoEntradaEntidad])],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
