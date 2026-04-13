import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarEventoDto } from './actualizar-evento.dto';
import { CrearEventoDto } from './crear-evento.dto';
import { EventoEntidad } from './evento.entidad';

@Injectable()
export class EventosService {
  constructor(@InjectRepository(EventoEntidad) private readonly eventosRepo: Repository<EventoEntidad>) {}

  async crear(dto: CrearEventoDto) {
    this.validarSecuenciaHoraria(dto.horaApertura, dto.horaInicio, dto.horaCierre);
    return this.eventosRepo.save(this.eventosRepo.create(dto));
  }

  obtenerTodos() {
    return this.eventosRepo.find({ order: { fecha: 'ASC', horaInicio: 'ASC' } });
  }

  async obtenerUno(id: string) {
    const evento = await this.eventosRepo.findOne({ where: { id }, relations: ['tiposEntrada'] });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  async actualizar(id: string, dto: ActualizarEventoDto) {
    const evento = await this.obtenerUno(id);
    const horaApertura = dto.horaApertura ?? evento.horaApertura;
    const horaInicio = dto.horaInicio ?? evento.horaInicio;
    const horaCierre = dto.horaCierre ?? evento.horaCierre;

    this.validarSecuenciaHoraria(horaApertura, horaInicio, horaCierre);

    Object.assign(evento, dto);
    return this.eventosRepo.save(evento);
  }


  async actualizarFlyer(id: string, rutaFlyer: string) {
    const evento = await this.obtenerUno(id);
    evento.flyerPrincipal = rutaFlyer;
    return this.eventosRepo.save(evento);
  }

  private validarSecuenciaHoraria(horaApertura: string, horaInicio: string, horaCierre: string) {
    if (horaApertura > horaInicio || horaInicio > horaCierre) {
      throw new BadRequestException('La secuencia horaria del evento es inválida');
    }
  }
}
