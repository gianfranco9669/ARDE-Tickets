import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActualizarEventoDto } from './actualizar-evento.dto';
import { CrearEventoDto } from './crear-evento.dto';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  obtenerTodos() {
    return this.eventosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.eventosService.obtenerUno(id);
  }

  @Post()
  crear(@Body() dto: CrearEventoDto) {
    return this.eventosService.crear(dto);
  }

  @Post(':id/flyer')
  @UseInterceptors(FileInterceptor('archivo'))
  async subirFlyer(@Param('id') id: string, @UploadedFile() archivo: Express.Multer.File) {
    return this.eventosService.actualizarFlyer(id, `/archivos/${archivo.filename}`);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() dto: ActualizarEventoDto) {
    return this.eventosService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eventosService.eliminar(id);
  }
}