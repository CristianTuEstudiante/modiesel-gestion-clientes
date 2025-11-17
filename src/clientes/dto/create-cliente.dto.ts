import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  doc_id: string; 

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @IsOptional() 
  direccion?: string;



  // Esta clase define la forma de los datos que esperamos
  // al momento de CREAR un cliente.
  // doc_id: string; Documento de identidad (RUC o DNI)
  // @IsOptional() La dirección puede ser opcional al registrarse
  // No incluimos 'historial' ni 'estado' aquí,
  // porque esos son datos que el servidor genera,
  // no datos que el cliente nos envía.
}