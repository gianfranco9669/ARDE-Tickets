import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../usuarios/users.module';
import { AutenticacionController } from './auth.controller';
import { AutenticacionService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'arde_dev_secret'),
        signOptions: { expiresIn: '12h' }
      })
    })
  ],
  providers: [AutenticacionService, JwtStrategy],
  controllers: [AutenticacionController]
})
export class AutenticacionModule {}
