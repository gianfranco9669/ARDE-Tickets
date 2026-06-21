import { IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TipoEntrada } from './tipo-entrada.enum';

export class CrearTipoEntradaDto {
  @IsString() eventoId!: string;
  @IsEnum(TipoEntrada) tipo!: TipoEntrada;
  @IsString() nombre!: string;
  @IsNumber() @Min(0) precio!: number;
  @IsInt() @Min(1) cupo!: number;
  @IsDateString() desde!: string;
  @IsDateString() hasta!: string;
  @IsString() horaDesde!: string;
  @IsString() horaHasta!: string;
  @IsInt() @Min(1) limitePorCompra!: number;
  @IsBoolean() reingresoPermitido!: boolean;
  @IsString() color!: string;
  @IsBoolean() visible!: boolean;
  @IsOptional() @IsString() observaciones?: string;
}
