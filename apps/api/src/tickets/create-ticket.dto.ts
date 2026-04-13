import { IsString } from 'class-validator';

export class CrearTicketDto {
  @IsString() eventoId: string;
  @IsString() tipoEntradaId: string;
  @IsString() titular: string;
}
