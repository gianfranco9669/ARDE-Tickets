import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntidad } from '../eventos/event.entity';
import { TipoEntradaEntidad } from '../tipos-entrada/entry-type.entity';
import { EstadoTicket } from './ticket-status.enum';

@Entity('tickets')
export class TicketEntidad {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) identificador: string;
  @ManyToOne(() => EventoEntidad) evento: EventoEntidad;
  @ManyToOne(() => TipoEntradaEntidad) tipoEntrada: TipoEntradaEntidad;
  @Column() titular: string;
  @Column({ type: 'enum', enum: EstadoTicket, default: EstadoTicket.EMITIDO }) estado: EstadoTicket;
  @Column({ unique: true }) tokenSeguro: string;
  @Column({ type: 'jsonb', default: [] }) historial: Array<Record<string, string>>;
  @CreateDateColumn() fechaEmision: Date;
}
