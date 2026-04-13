import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntidad } from '../eventos/evento.entidad';
import { TipoEntradaEntidad } from '../tipos-entrada/tipo-entrada.entidad';
import { EntradaEntidad } from './entrada.entidad';
import { EntradasController } from './entradas.controller';
import { EntradasService } from './entradas.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaEntidad, EventoEntidad, TipoEntradaEntidad])],
  controllers: [EntradasController],
  providers: [EntradasService]
})
export class EntradasModule {}
