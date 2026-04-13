import { IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TipoEntrada } from './tipo-entrada.enum';

export class ActualizarTipoEntradaDto {
  @IsOptional() @IsEnum(TipoEntrada) tipo?: TipoEntrada;
  @IsOptional() @IsString() nombre?: string;
  @IsOptional() @IsNumber() @Min(0) precio?: number;
  @IsOptional() @IsInt() @Min(1) cupo?: number;
  @IsOptional() @IsDateString() desde?: string;
  @IsOptional() @IsDateString() hasta?: string;
  @IsOptional() @IsString() horaDesde?: string;
  @IsOptional() @IsString() horaHasta?: string;
  @IsOptional() @IsInt() @Min(1) limitePorCompra?: number;
  @IsOptional() @IsBoolean() reingresoPermitido?: boolean;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsBoolean() visible?: boolean;
  @IsOptional() @IsString() observaciones?: string;
}
