import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from '../eventos/eventos.module';
import { TipoEntradaEntidad } from './tipo-entrada.entidad';
import { TiposEntradaController } from './tipos-entrada.controller';
import { TiposEntradaService } from './tipos-entrada.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEntradaEntidad]), EventosModule],
  controllers: [TiposEntradaController],
  providers: [TiposEntradaService]
})
export class TiposEntradaModule {}
