import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { InicioService } from './dashboard.service';

@Controller('inicio')
@UseGuards(JwtAuthGuard)
export class InicioController {
  constructor(private readonly inicioService: InicioService) {}

  @Get('resumen')
  getResumen() {
    return this.inicioService.resumen();
  }
}
