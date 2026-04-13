import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntradaEntidad } from '../entradas/entrada.entidad';
import { ActualizarEventoDto } from './actualizar-evento.dto';
import { CrearEventoDto } from './crear-evento.dto';
import { EventoEntidad } from './evento.entidad';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(EventoEntidad) private readonly eventosRepo: Repository<EventoEntidad>,
    @InjectRepository(EntradaEntidad) private readonly entradasRepo: Repository<EntradaEntidad>
  ) {}

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

    const entradas = await this.entradasRepo.find({ where: { evento: { id } }, relations: ['tipoEntrada'] });
    const emitidas = entradas.length;
    const validadas = entradas.filter((entrada) => entrada.estado === 'validada').length;

    return {
      ...evento,
      metricas: {
        tiposEntradaActivos: evento.tiposEntrada.filter((tipo) => tipo.visible).length,
        entradasEmitidas: emitidas,
        entradasValidadas: validadas,
        porcentajeValidacion: emitidas ? Number(((validadas / emitidas) * 100).toFixed(2)) : 0
      }
    };
  }

  async actualizar(id: string, dto: ActualizarEventoDto) {
    const evento = await this.eventosRepo.findOneBy({ id });
    if (!evento) throw new NotFoundException('Evento no encontrado');

    const horaApertura = dto.horaApertura ?? evento.horaApertura;
    const horaInicio = dto.horaInicio ?? evento.horaInicio;
    const horaCierre = dto.horaCierre ?? evento.horaCierre;

    this.validarSecuenciaHoraria(horaApertura, horaInicio, horaCierre);

    Object.assign(evento, dto);
    return this.eventosRepo.save(evento);
  }

  async actualizarFlyer(id: string, rutaFlyer: string) {
    const evento = await this.eventosRepo.findOneBy({ id });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    evento.flyerPrincipal = rutaFlyer;
    return this.eventosRepo.save(evento);
  }

  private validarSecuenciaHoraria(horaApertura: string, horaInicio: string, horaCierre: string) {
    if (horaApertura > horaInicio || horaInicio > horaCierre) {
      throw new BadRequestException('La secuencia horaria del evento es inválida');
    }
  }
}
