import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CrearCarritoDto {
  @ApiProperty({
    description: 'Fecha de carrito',
  })
  @IsNotEmpty()
  @IsString()
  fecha: string;

  @ApiProperty({
    description: 'Total del carrito',
  })
  @IsNotEmpty()
  @IsString()
  total: string;

  @ApiProperty({
    description: 'ID de usuario al que pertenece el carrito',
  })
  @IsNotEmpty()
  @IsUUID()
  id_usuario: string;
}
