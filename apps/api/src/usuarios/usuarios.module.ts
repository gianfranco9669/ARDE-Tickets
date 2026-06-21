import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntidad } from './usuario.entidad';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntidad])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService]
})
export class UsuariosModule {}
