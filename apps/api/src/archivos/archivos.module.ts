import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArchivosController } from './archivos.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './archivos',
        filename: (_, file, callback) => {
          const unico = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          callback(null, unico);
        }
      })
    })
  ],
  controllers: [ArchivosController]
})
export class ArchivosModule {}
