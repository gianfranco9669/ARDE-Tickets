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

export class CrearEventoDto {
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  subtitulo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(280)
  descripcionCorta?: string;

  @IsOptional()
  @IsString()
  descripcionCompleta?: string;

  @IsDateString()
  aperturaEn!: string;

  @IsDateString()
  inicioEn!: string;

  @IsDateString()
  cierreEn!: string;

  @IsString()
  lugar!: string;

  @IsString()
  direccion!: string;

  @IsInt()
  @Min(1)
  capacidadTotal!: number;

  @IsInt()
  @Min(13)
  edadMinima!: number;

  @IsEnum(EstadoEvento)
  estado!: EstadoEvento;

  @IsOptional()
  @IsString()
  flyerPrincipal?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  galeria?: string[];

  @IsOptional()
  @IsString()
  observacionesInternas?: string;
}
