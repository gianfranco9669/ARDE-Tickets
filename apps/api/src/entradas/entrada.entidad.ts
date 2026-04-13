import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntidad } from '../eventos/evento.entidad';
import { TipoEntradaEntidad } from '../tipos-entrada/tipo-entrada.entidad';
import { EstadoEntrada } from './estado-entrada.enum';

@Entity('entradas')
export class EntradaEntidad {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) identificador: string;
  @ManyToOne(() => EventoEntidad) evento: EventoEntidad;
  @ManyToOne(() => TipoEntradaEntidad) tipoEntrada: TipoEntradaEntidad;
  @Column() titular: string;
  @Column({ type: 'enum', enum: EstadoEntrada, default: EstadoEntrada.EMITIDA }) estado: EstadoEntrada;
  @Column({ unique: true }) tokenSeguro: string;
  @Column({ type: 'jsonb', default: [] }) historial: Array<Record<string, string>>;
  @CreateDateColumn() fechaEmision: Date;
}
