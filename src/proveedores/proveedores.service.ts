import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}
  
  async create(createProveedoreDto: CreateProveedoreDto) {
    try {
      return await this.prisma.proveedor.create({
        data: createProveedoreDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`El RUC o Email ya está registrado en otro proveedor.`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const proveedores = await this.prisma.proveedor.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.proveedor.count();

    return {
      data: proveedores,
      meta: { total, page, lastPage: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: { id },
    });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID #${id} no encontrado`);
    }
    return proveedor;
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    try {
      return await this.prisma.proveedor.update({
        where: { id },
        data: updateProveedoreDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') throw new NotFoundException(`Proveedor con ID #${id} no encontrado`);
        if (error.code === 'P2002') throw new ConflictException('El RUC o Email ya está en uso.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.proveedor.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Proveedor con ID #${id} no encontrado`);
      }
      throw error;
    }
  }
}