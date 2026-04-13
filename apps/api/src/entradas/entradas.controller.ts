import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAutenticacionGuard } from '../common/guards/jwt-autenticacion.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
import { CrearEntradaDto } from './crear-entrada.dto';
import { EntradasService } from './entradas.service';

@Controller('entradas')
@UseGuards(JwtAutenticacionGuard, RolesGuard)
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) {}

  @Get()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION, RolUsuario.CAJA, RolUsuario.AUDITORIA)
  obtenerEmitidas(@Query('eventoId') eventoId?: string) {
    return this.entradasService.obtenerEmitidas(eventoId);
  }

  @Post()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.CAJA, RolUsuario.RRPP)
  crear(@Body() dto: CrearEntradaDto) {
    return this.entradasService.crear(dto);
  }
}
