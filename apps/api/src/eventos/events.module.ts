import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntidad } from './event.entity';
import { EventosController } from './events.controller';
import { EventosService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventoEntidad])],
  providers: [EventosService],
  controllers: [EventosController],
  exports: [EventosService, TypeOrmModule]
})
export class EventosModule {}
