import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntidad } from '../eventos/evento.entidad';
import { TipoEntrada } from './tipo-entrada.enum';

@Entity('tipos_entrada')
export class TipoEntradaEntidad {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => EventoEntidad, (evento) => evento.tiposEntrada, { onDelete: 'CASCADE' })
  evento: EventoEntidad;

  @Column({ type: 'enum', enum: TipoEntrada }) tipo: TipoEntrada;
  @Column() nombre: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) precio: number;
  @Column({ type: 'int' }) cupo: number;

  @Column({ type: 'timestamp' }) desde: Date;
  @Column({ type: 'timestamp' }) hasta: Date;
  @Column({ type: 'time' }) horaDesde: string;
  @Column({ type: 'time' }) horaHasta: string;

  @Column({ type: 'int', default: 10 }) limitePorCompra: number;
  @Column({ default: true }) reingresoPermitido: boolean;
  @Column({ default: '#6B7280' }) color: string;
  @Column({ default: true }) visible: boolean;
  @Column({ nullable: true }) observaciones?: string;
}
