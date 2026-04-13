import { Module } from '@nestjs/common';
import { InicioController } from './dashboard.controller';
import { InicioService } from './dashboard.service';

@Module({
  controllers: [InicioController],
  providers: [InicioService]
})
export class InicioModule {}
