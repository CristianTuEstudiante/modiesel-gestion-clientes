import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientesService } from 'src/clientes/clientes.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private clientesService: ClientesService, // Inyección del otro servicio
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    // 1. ORQUESTACIÓN: Auth llama a Clientes para buscar el usuario
    // Nota: Necesitaremos crear un método findByEmail en ClientesService
    const cliente = await this.clientesService.findByEmail(email);

    // 2. Validar contraseña (aquí simplificado, idealmente usaríamos bcrypt)
    if (cliente?.password !== pass) {
      throw new UnauthorizedException();
    }

    // 3. Generar Token
    const payload = { sub: cliente.id, username: cliente.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}