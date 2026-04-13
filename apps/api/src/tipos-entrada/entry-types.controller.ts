import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolUsuario } from '../usuarios/user-role.enum';
import { CrearTipoEntradaDto } from './create-entry-type.dto';
import { TiposEntradaService } from './entry-types.service';

@Controller('tipos-entrada')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TiposEntradaController {
  constructor(private readonly service: TiposEntradaService) {}

  @Post()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.PRODUCCION)
  crear(@Body() dto: CrearTipoEntradaDto) {
    return this.service.crear(dto);
  }
}
