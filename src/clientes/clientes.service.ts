import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {

    constructor(private prisma: PrismaService) {}

    async create(createClienteDto: CreateClienteDto) {
        try {
      const nuevoCliente = await this.prisma.cliente.create({
        data: createClienteDto,
      });
      return nuevoCliente;
    } catch (error) {
      // P2002 es el código de Prisma para "Unique constraint failed"
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(
          `Ya existe un cliente con ese ${error.meta?.target} registrado.`
        );
      }
      // Cualquier otro error, lanzamos 500
      throw new InternalServerErrorException();
    }
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

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const idNum = Number(id);
    if (Number.isNaN(idNum)) throw new BadRequestException('ID inválido');

    try {
      // Prisma devuelve el objeto actualizado
      return await this.prisma.cliente.update({
        where: { id: idNum },
        data: updateClienteDto,
      });
    } catch (error) {
      // Manejo de error si el registro no existe
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
         throw new NotFoundException(`Cliente con ID "${idNum}" no encontrado para actualizar.`);
      }
      // Manejo si intentan actualizar un email a uno que ya existe en otro usuario
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('El dato único (email o doc_id) ya está en uso por otro cliente.');
      }
      throw error;
    }
  }
  async remove(id: string) {
    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
      throw new BadRequestException('El ID debe ser un número válido');
    }

    try {
      // "Hard Delete": Borra físicamente el registro
      return await this.prisma.cliente.delete({
        where: { id: idNum },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Cliente con ID "${idNum}" no encontrado para eliminar.`);
      }
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    // Prisma permite 'skip' y 'take' para paginar
    const clientes = await this.prisma.cliente.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc', // Los más nuevos primero
      },
    });

    // Contamos el total para que el frontend sepa cuántas páginas hay
    const total = await this.prisma.cliente.count();

    return {
      data: clientes,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
