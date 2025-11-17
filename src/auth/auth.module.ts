import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientesModule } from 'src/clientes/clientes.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
  imports: [
    PrismaModule,
    ClientesModule, 
    JwtModule.register({
      global: true,
      secret: 'CLAVE_SECRETA_SUPER_SEGURA', // En producción esto va en .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
