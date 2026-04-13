import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolUsuario } from '../usuarios/user-role.enum';
import { CrearEventoDto } from './create-event.dto';
import { EventosService } from './events.service';

@Controller('eventos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION, RolUsuario.AUDITORIA)
  obtenerTodos() {
    return this.eventosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.eventosService.obtenerUno(id);
  }

  @Post()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION)
  crear(@Body() dto: CrearEventoDto) {
    return this.eventosService.crear(dto);
  }
}
