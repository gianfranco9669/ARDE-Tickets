import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './create-user.dto';
import { UsuarioEntidad } from './user.entity';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(UsuarioEntidad) private readonly usuariosRepo: Repository<UsuarioEntidad>) {}

  async crear(dto: CrearUsuarioDto) {
    const usuario = this.usuariosRepo.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    });
    return this.usuariosRepo.save(usuario);
  }

  obtenerTodos() {
    return this.usuariosRepo.find({ select: ['id', 'email', 'nombreCompleto', 'rol', 'activo', 'creadoEn'] });
  }

  async buscarPorEmail(email: string) {
    const usuario = await this.usuariosRepo.findOne({ where: { email } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }
}
