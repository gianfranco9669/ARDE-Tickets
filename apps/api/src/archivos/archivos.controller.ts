import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAutenticacionGuard } from '../common/guards/jwt-autenticacion.guard';

@Controller('archivos')
@UseGuards(JwtAutenticacionGuard)
export class ArchivosController {
  @Post('flyer')
  @UseInterceptors(FileInterceptor('archivo'))
  subirFlyer(@UploadedFile() archivo: Express.Multer.File) {
    return { nombre: archivo.originalname, url: `/archivos/${archivo.filename}` };
  }
}
