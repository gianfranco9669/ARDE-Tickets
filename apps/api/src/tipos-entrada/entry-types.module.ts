import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from '../eventos/events.module';
import { TipoEntradaEntidad } from './entry-type.entity';
import { TiposEntradaController } from './entry-types.controller';
import { TiposEntradaService } from './entry-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEntradaEntidad]), EventosModule],
  controllers: [TiposEntradaController],
  providers: [TiposEntradaService]
})
export class TiposEntradaModule {}
