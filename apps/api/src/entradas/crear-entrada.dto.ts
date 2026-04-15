import { IsString } from 'class-validator';

export class CrearEntradaDto {
  @IsString()
  eventoId!: string;

  @IsString()
  tipoEntradaId!: string;

  @IsString()
  titular!: string;
}
