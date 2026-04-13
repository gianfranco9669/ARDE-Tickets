import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventosService } from '../eventos/events.service';
import { CrearTipoEntradaDto } from './create-entry-type.dto';
import { TipoEntradaEntidad } from './entry-type.entity';

@Injectable()
export class TiposEntradaService {
  constructor(
    @InjectRepository(TipoEntradaEntidad) private readonly repo: Repository<TipoEntradaEntidad>,
    private readonly eventosService: EventosService
  ) {}

  async crear(dto: CrearTipoEntradaDto) {
    if (new Date(dto.desde) >= new Date(dto.hasta)) {
      throw new BadRequestException('La vigencia del tipo de entrada es inválida');
    }
    const evento = await this.eventosService.obtenerUno(dto.eventoId);
    return this.repo.save(this.repo.create({ ...dto, desde: new Date(dto.desde), hasta: new Date(dto.hasta), evento }));
  }
}
