import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearEventoDto } from './crear-evento.dto';
import { EventoEntidad } from './evento.entidad';

@Injectable()
export class EventosService {
  constructor(@InjectRepository(EventoEntidad) private readonly eventosRepo: Repository<EventoEntidad>) {}

  async crear(dto: CrearEventoDto) {
    if (dto.horaApertura > dto.horaInicio || dto.horaInicio > dto.horaCierre) {
      throw new BadRequestException('La secuencia horaria del evento es inválida');
    }
    return this.eventosRepo.save(this.eventosRepo.create(dto));
  }

  obtenerTodos() {
    return this.eventosRepo.find({ order: { fecha: 'ASC' } });
  }

  async obtenerUno(id: string) {
    const evento = await this.eventosRepo.findOne({ where: { id }, relations: ['tiposEntrada'] });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }
}
