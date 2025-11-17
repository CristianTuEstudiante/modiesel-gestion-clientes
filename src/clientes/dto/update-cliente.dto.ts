import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

// Hereda todas las validaciones de Create, pero las hace opcionales
export class UpdateClienteDto extends PartialType(CreateClienteDto) {}