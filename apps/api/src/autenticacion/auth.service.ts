import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { RolUsuario } from '../usuarios/user-role.enum';
import { UsuariosService } from '../usuarios/users.service';
import { MetodoIngreso, SolicitarAccesoDto } from './solicitar-acceso.dto';

type SolicitudTemporal = {
  id: string;
  metodo: MetodoIngreso;
  email?: string;
  telefono?: string;
  codigo?: string;
  expiraEn: Date;
};

@Injectable()
export class AutenticacionService {
  private solicitudes = new Map<string, SolicitudTemporal>();

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService
  ) {}

  async iniciarIngreso(dto: SolicitarAccesoDto) {
    if (dto.metodo === MetodoIngreso.GOOGLE) {
      return {
        metodo: dto.metodo,
        urlAutorizacion: '/api/autenticacion/google/iniciar',
        mensaje: 'Redirigir al flujo OAuth de Google.'
      };
    }

    if (dto.metodo === MetodoIngreso.CREDENCIALES) {
      if (!dto.email || !dto.password) {
        throw new BadRequestException('Email y contraseña son obligatorios para credenciales.');
      }
      const usuario = await this.usuariosService.buscarPorEmail(dto.email);
      const ok = await bcrypt.compare(dto.password, usuario.password);
      if (!ok || !usuario.activo) throw new UnauthorizedException('Credenciales inválidas.');
      return this.emitirSesion(usuario.id, usuario.email, usuario.rol, usuario.nombreCompleto);
    }

    const solicitudId = randomUUID();
    const codigo = `${Math.floor(100000 + Math.random() * 900000)}`;
    this.solicitudes.set(solicitudId, {
      id: solicitudId,
      metodo: dto.metodo,
      email: dto.email,
      telefono: dto.telefono,
      codigo,
      expiraEn: new Date(Date.now() + 5 * 60 * 1000)
    });

    return {
      solicitudId,
      metodo: dto.metodo,
      destino: dto.telefono ?? dto.email,
      mensaje: 'Código generado. Integrar proveedor SMS/Email para entrega real.'
    };
  }

  async verificarCodigo(solicitudId: string, codigo: string) {
    const solicitud = this.solicitudes.get(solicitudId);
    if (!solicitud || solicitud.expiraEn < new Date() || solicitud.codigo !== codigo) {
      throw new UnauthorizedException('Código inválido o expirado.');
    }

    const email = solicitud.email ?? `temporal+${solicitud.id}@arde.local`;
    const usuario = await this.usuariosService.buscarPorEmail(email).catch(async () =>
      this.usuariosService.crear({
        email,
        nombreCompleto: 'Usuario ARDE',
        password: randomUUID(),
        rol: RolUsuario.AUDITORIA
      })
    );

    this.solicitudes.delete(solicitudId);
    return this.emitirSesion(usuario.id, usuario.email, usuario.rol, usuario.nombreCompleto);
  }

  private async emitirSesion(id: string, email: string, rol: string, nombreCompleto: string) {
    return {
      tokenAcceso: await this.jwtService.signAsync({ sub: id, email, rol }),
      usuario: { id, email, rol, nombreCompleto }
    };
  }
}
