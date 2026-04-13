import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivosModule } from './archivos/uploads.module';
import { AutenticacionModule } from './autenticacion/auth.module';
import { InicioModule } from './inicio/dashboard.module';
import { TiposEntradaModule } from './tipos-entrada/entry-types.module';
import { EventosModule } from './eventos/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsuariosModule } from './usuarios/users.module';

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
    TicketsModule,
    InicioModule,
    ArchivosModule
  ]
})
export class AppModule {}
