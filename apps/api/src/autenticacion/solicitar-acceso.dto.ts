import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum MetodoIngreso {
  GOOGLE = 'google',
  TELEFONO_OTP = 'telefono_otp',
  MAIL_LINK = 'mail_link',
  MAIL_CODIGO = 'mail_codigo',
  CREDENCIALES = 'credenciales'
}

export class SolicitarAccesoDto {
  @IsEnum(MetodoIngreso)
  metodo!: MetodoIngreso;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
