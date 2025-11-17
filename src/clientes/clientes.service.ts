import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClientesService {

    constructor(private prisma: PrismaService) {}

    async create(createClienteDto: CreateClienteDto) {
        const nuevoCliente = await this.prisma.cliente.create({
            data: createClienteDto,
        });
        return nuevoCliente;
    }

    async findOne(id: string) {
    // El parámetro `id` viene como string (ej. desde una ruta).
    // Prisma espera un `number` para la propiedad `id` del modelo `Cliente`.
    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
      throw new BadRequestException('El id debe ser un número válido');
    }

    const cliente = await this.prisma.cliente.findUnique({
      where: { id: idNum },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID "${idNum}" no encontrado.`);
    }

    return cliente;
  }
}
