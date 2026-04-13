import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAutenticacionGuard } from '../common/guards/jwt-autenticacion.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CrearUsuarioDto } from './crear-usuario.dto';
import { RolUsuario } from './rol-usuario.enum';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
@UseGuards(JwtAutenticacionGuard, RolesGuard)
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
