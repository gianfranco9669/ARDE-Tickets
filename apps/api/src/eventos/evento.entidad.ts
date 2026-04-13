import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EntradaEntidad } from '../entradas/entrada.entidad';
import { TipoEntradaEntidad } from '../tipos-entrada/tipo-entrada.entidad';
import { EstadoEvento } from './estado-evento.enum';

@Entity('eventos')
export class EventoEntidad {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() nombre: string;
  @Column({ nullable: true }) subtitulo?: string;
  @Column({ name: 'descripcion_corta', length: 280, nullable: true }) descripcionCorta?: string;
  @Column({ name: 'descripcion_completa', type: 'text', nullable: true }) descripcionCompleta?: string;

  @Column({ type: 'date' }) fecha: string;
  @Column({ name: 'hora_apertura', type: 'time' }) horaApertura: string;
  @Column({ name: 'hora_inicio', type: 'time' }) horaInicio: string;
  @Column({ name: 'hora_cierre', type: 'time' }) horaCierre: string;

  @Column() lugar: string;
  @Column() direccion: string;
  @Column({ name: 'capacidad_total', type: 'int' }) capacidadTotal: number;
  @Column({ name: 'edad_minima', type: 'int', default: 18 }) edadMinima: number;

  @Column({ type: 'enum', enum: EstadoEvento, default: EstadoEvento.BORRADOR }) estado: EstadoEvento;

  @Column({ name: 'flyer_principal', nullable: true }) flyerPrincipal?: string;
  @Column({ type: 'simple-array', nullable: true }) galeria?: string[];

  @Column({ name: 'observaciones_internas', type: 'text', nullable: true }) observacionesInternas?: string;

  @OneToMany(() => TipoEntradaEntidad, (tipoEntrada) => tipoEntrada.evento) tiposEntrada: TipoEntradaEntidad[];
  @OneToMany(() => EntradaEntidad, (entrada) => entrada.evento) entradas: EntradaEntidad[];

  @CreateDateColumn({ name: 'creado_en' }) creadoEn: Date;
  @UpdateDateColumn({ name: 'actualizado_en' }) actualizadoEn: Date;
}
