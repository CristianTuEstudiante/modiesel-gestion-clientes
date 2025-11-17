import { Controller, Get, Post, Body, Param , Patch, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @Post()
    create(@Body() CreateClienteDto: CreateClienteDto) {
        return this.clientesService.create(CreateClienteDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.clientesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
      return this.clientesService.update(id, updateClienteDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.clientesService.remove(id);
    }
    @Get() 
    findAll(
      // Si no envían 'page', asumimos 1. ParseIntPipe convierte el string "1" a número 1
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
      return this.clientesService.findAll(page, limit);
    }
}
