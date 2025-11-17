import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProveedoreDto {
  @IsString()
  @IsNotEmpty()
  ruc: string;

  @IsString()
  @IsNotEmpty()
  razonSocial: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  categoria?: string;
}