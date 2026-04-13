import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivosModule } from './archivos/archivos.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { EntradasModule } from './entradas/entradas.module';
import { EventosModule } from './eventos/eventos.module';
import { InicioModule } from './inicio/inicio.module';
import { TiposEntradaModule } from './tipos-entrada/tipos-entrada.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'arde'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    AutenticacionModule,
    UsuariosModule,
    EventosModule,
    TiposEntradaModule,
    EntradasModule,
    InicioModule,
    ArchivosModule
  ]
})
export class AppModule {}
