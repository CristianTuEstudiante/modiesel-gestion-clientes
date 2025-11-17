import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

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


}
