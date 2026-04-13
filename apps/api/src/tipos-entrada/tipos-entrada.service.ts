import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventosService } from '../eventos/eventos.service';
import { ActualizarTipoEntradaDto } from './actualizar-tipo-entrada.dto';
import { CrearTipoEntradaDto } from './crear-tipo-entrada.dto';
import { TipoEntradaEntidad } from './tipo-entrada.entidad';

@Injectable()
export class TiposEntradaService {
  constructor(
    @InjectRepository(TipoEntradaEntidad) private readonly repo: Repository<TipoEntradaEntidad>,
    private readonly eventosService: EventosService
  ) {}

  async crear(dto: CrearTipoEntradaDto) {
    this.validarVigenciaYHorario(dto.desde, dto.hasta, dto.horaDesde, dto.horaHasta);
    const evento = await this.eventosService.obtenerUno(dto.eventoId);

    return this.repo.save(
      this.repo.create({
        ...dto,
        desde: new Date(dto.desde),
        hasta: new Date(dto.hasta),
        evento
      })
    );
  }

  obtenerPorEvento(eventoId: string) {
    return this.repo.find({ where: { evento: { id: eventoId } }, order: { precio: 'ASC' } });
  }

  async actualizar(id: string, dto: ActualizarTipoEntradaDto) {
    const tipo = await this.repo.findOne({ where: { id } });
    if (!tipo) throw new NotFoundException('Tipo de entrada no encontrado');

    const desde = dto.desde ?? tipo.desde.toISOString();
    const hasta = dto.hasta ?? tipo.hasta.toISOString();
    const horaDesde = dto.horaDesde ?? tipo.horaDesde;
    const horaHasta = dto.horaHasta ?? tipo.horaHasta;

    this.validarVigenciaYHorario(desde, hasta, horaDesde, horaHasta);

    Object.assign(tipo, {
      ...dto,
      desde: dto.desde ? new Date(dto.desde) : tipo.desde,
      hasta: dto.hasta ? new Date(dto.hasta) : tipo.hasta
    });

    return this.repo.save(tipo);
  }

  private validarVigenciaYHorario(desde: string, hasta: string, horaDesde: string, horaHasta: string) {
    if (new Date(desde) >= new Date(hasta)) {
      throw new BadRequestException('La vigencia del tipo de entrada es inválida');
    }
    if (horaDesde > horaHasta) {
      throw new BadRequestException('El horario válido del tipo de entrada es inválido');
    }
  }
}
