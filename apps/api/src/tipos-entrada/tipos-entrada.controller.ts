import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAutenticacionGuard } from '../common/guards/jwt-autenticacion.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
import { CrearTipoEntradaDto } from './crear-tipo-entrada.dto';
import { TiposEntradaService } from './tipos-entrada.service';

@Controller('tipos-entrada')
@UseGuards(JwtAutenticacionGuard, RolesGuard)
export class TiposEntradaController {
  constructor(private readonly service: TiposEntradaService) {}

  @Post()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION)
  crear(@Body() dto: CrearTipoEntradaDto) {
    return this.service.crear(dto);
  }
}
