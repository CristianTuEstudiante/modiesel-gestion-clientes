import { Injectable } from '@nestjs/common';
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
}
