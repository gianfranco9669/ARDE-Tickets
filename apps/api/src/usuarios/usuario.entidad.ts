import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RolUsuario } from './rol-usuario.enum';

@Entity('usuarios')
export class UsuarioEntidad {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) email: string;
  @Column({ name: 'nombre_completo' }) nombreCompleto: string;
  @Column() password: string;
  @Column({ type: 'enum', enum: RolUsuario, default: RolUsuario.AUDITORIA }) rol: RolUsuario;
  @Column({ default: true }) activo: boolean;
  @CreateDateColumn({ name: 'creado_en' }) creadoEn: Date;
  @UpdateDateColumn({ name: 'actualizado_en' }) actualizadoEn: Date;
}
