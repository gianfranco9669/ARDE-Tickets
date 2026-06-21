import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAutenticacionGuard } from '../common/guards/jwt-autenticacion.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
import { ActualizarTipoEntradaDto } from './actualizar-tipo-entrada.dto';
import { CrearTipoEntradaDto } from './crear-tipo-entrada.dto';
import { TiposEntradaService } from './tipos-entrada.service';

@Controller('tipos-entrada')
@UseGuards(JwtAutenticacionGuard, RolesGuard)
export class TiposEntradaController {
  constructor(private readonly service: TiposEntradaService) {}

  @Get('evento/:eventoId')
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION, RolUsuario.AUDITORIA)
  obtenerPorEvento(@Param('eventoId') eventoId: string) {
    return this.service.obtenerPorEvento(eventoId);
  }

  @Post()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION)
  crear(@Body() dto: CrearTipoEntradaDto) {
    return this.service.crear(dto);
  }

  @Put(':id')
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION)
  actualizar(@Param('id') id: string, @Body() dto: ActualizarTipoEntradaDto) {
    return this.service.actualizar(id, dto);
  }
}
