import { IsString, Length } from 'class-validator';

export class VerificarAccesoDto {
  @IsString()
  solicitudId!: string;

  @IsString()
  @Length(4, 8)
  codigo!: string;
}
