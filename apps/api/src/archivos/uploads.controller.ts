import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('archivos')
@UseGuards(JwtAuthGuard)
export class ArchivosController {
  @Post('flyer')
  @UseInterceptors(FileInterceptor('archivo'))
  subirFlyer(@UploadedFile() archivo: Express.Multer.File) {
    return { nombre: archivo.originalname, url: `/archivos/${archivo.filename}` };
  }
}
