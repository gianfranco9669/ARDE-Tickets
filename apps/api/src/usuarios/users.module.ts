import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './users.controller';
import { UsuariosService } from './users.service';
import { UsuarioEntidad } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntidad])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService]
})
export class UsuariosModule {}
