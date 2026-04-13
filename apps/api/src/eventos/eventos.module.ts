import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradaEntidad } from '../entradas/entrada.entidad';
import { EventoEntidad } from './evento.entidad';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventoEntidad, EntradaEntidad])],
  providers: [EventosService],
  controllers: [EventosController],
  exports: [EventosService, TypeOrmModule]
})
export class EventosModule {}
