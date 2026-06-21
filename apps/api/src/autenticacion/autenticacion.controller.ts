import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { SolicitarAccesoDto } from './solicitar-acceso.dto';
import { VerificarAccesoDto } from './verificar-acceso.dto';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('iniciar')
  iniciar(@Body() dto: SolicitarAccesoDto) {
    return this.autenticacionService.iniciarIngreso(dto);
  }

  @Post('verificar')
  verificar(@Body() dto: VerificarAccesoDto) {
    return this.autenticacionService.verificarCodigo(dto.solicitudId, dto.codigo);
  }
}
