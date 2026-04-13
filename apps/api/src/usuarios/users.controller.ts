import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CrearUsuarioDto } from './create-user.dto';
import { RolUsuario } from './user-role.enum';
import { UsuariosService } from './users.service';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR)
  obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  @Post()
  @Roles(RolUsuario.SUPERADMIN)
  crear(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crear(dto);
  }
}
