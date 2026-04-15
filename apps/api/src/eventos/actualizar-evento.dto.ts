import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min
} from 'class-validator';
import { EstadoEvento } from './estado-evento.enum';

export class ActualizarEventoDto {
  @IsOptional() @IsString() nombre?: string;
  @IsOptional() @IsString() subtitulo?: string;
  @IsOptional() @IsString() @MaxLength(280) descripcionCorta?: string;
  @IsOptional() @IsString() descripcionCompleta?: string;

  @IsOptional() @IsDateString() aperturaEn?: string;
  @IsOptional() @IsDateString() inicioEn?: string;
  @IsOptional() @IsDateString() cierreEn?: string;

  @IsOptional() @IsString() lugar?: string;
  @IsOptional() @IsString() direccion?: string;

  @IsOptional() @IsInt() @Min(1) capacidadTotal?: number;
  @IsOptional() @IsInt() @Min(13) edadMinima?: number;
  @IsOptional() @IsEnum(EstadoEvento) estado?: EstadoEvento;

  @IsOptional() @IsString() flyerPrincipal?: string;
  @IsOptional() @IsArray() @ArrayMaxSize(12) @IsString({ each: true }) galeria?: string[];

  @IsOptional() @IsString() observacionesInternas?: string;
}
