import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ClientesModule,
    PrismaModule,
    ProveedoresModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // '*' significa: Aplica a TODAS las rutas
  }
}