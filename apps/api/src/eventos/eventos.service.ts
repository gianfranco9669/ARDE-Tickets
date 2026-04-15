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
    this.validarSecuenciaOperacion(dto.aperturaEn, dto.inicioEn, dto.cierreEn);
    return this.eventosRepo.save(
      this.eventosRepo.create({
        ...dto,
        aperturaEn: new Date(dto.aperturaEn),
        inicioEn: new Date(dto.inicioEn),
        cierreEn: new Date(dto.cierreEn)
      })
    );
  }

  obtenerTodos() {
    return this.eventosRepo.find({ order: { inicioEn: 'ASC' } });
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

    const aperturaEn = dto.aperturaEn ?? evento.aperturaEn.toISOString();
    const inicioEn = dto.inicioEn ?? evento.inicioEn.toISOString();
    const cierreEn = dto.cierreEn ?? evento.cierreEn.toISOString();

    this.validarSecuenciaOperacion(aperturaEn, inicioEn, cierreEn);

    Object.assign(evento, {
      ...dto,
      aperturaEn: dto.aperturaEn ? new Date(dto.aperturaEn) : evento.aperturaEn,
      inicioEn: dto.inicioEn ? new Date(dto.inicioEn) : evento.inicioEn,
      cierreEn: dto.cierreEn ? new Date(dto.cierreEn) : evento.cierreEn
    });

    return this.eventosRepo.save(evento);
  }

  async actualizarFlyer(id: string, rutaFlyer: string) {
    const evento = await this.eventosRepo.findOneBy({ id });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    evento.flyerPrincipal = rutaFlyer;
    return this.eventosRepo.save(evento);
  }

  private validarSecuenciaOperacion(aperturaEn: string, inicioEn: string, cierreEn: string) {
    const apertura = new Date(aperturaEn).getTime();
    const inicio = new Date(inicioEn).getTime();
    const cierre = new Date(cierreEn).getTime();

    if (!Number.isFinite(apertura) || !Number.isFinite(inicio) || !Number.isFinite(cierre)) {
      throw new BadRequestException('Las fechas de operación del evento son inválidas');
    }

    if (!(apertura < inicio && inicio < cierre)) {
      throw new BadRequestException('La operación del evento debe cumplir aperturaEn < inicioEn < cierreEn');
    }
  }
}
