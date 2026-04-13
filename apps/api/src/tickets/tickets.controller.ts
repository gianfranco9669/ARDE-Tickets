import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RolUsuario } from '../usuarios/user-role.enum';
import { CrearTicketDto } from './create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles(RolUsuario.SUPERADMIN, RolUsuario.ADMINISTRADOR, RolUsuario.CAJA, RolUsuario.RRPP)
  crear(@Body() dto: CrearTicketDto) {
    return this.ticketsService.crear(dto);
  }
}
