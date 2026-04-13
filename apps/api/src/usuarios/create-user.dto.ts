import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { RolUsuario } from './user-role.enum';

export class CrearUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  nombreCompleto: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(RolUsuario)
  rol: RolUsuario;
}
