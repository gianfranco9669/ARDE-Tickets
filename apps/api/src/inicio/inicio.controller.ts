import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAutenticacionGuard } from '../common/guards/jwt-autenticacion.guard';
import { InicioService } from './inicio.service';

@Controller('inicio')
@UseGuards(JwtAutenticacionGuard)
export class InicioController {
  constructor(private readonly inicioService: InicioService) {}

  @Get('resumen')
  getResumen() {
    return this.inicioService.resumen();
  }
}
