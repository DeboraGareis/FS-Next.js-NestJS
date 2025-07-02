import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CrearCarritoDto {
  @ApiProperty({
    description: 'Fecha de carrito',
    example: '2025-06-27',
  })
  @IsNotEmpty()
  @IsISO8601()
  fecha: string;

  @ApiProperty({
    description: 'Total del carrito',
    example: '10000',
  })
  @IsNotEmpty()
  @IsString()
  total: string;

  @ApiProperty({
    description: 'ID de usuario al que pertenece el carrito',
    example: 'UUID',
  })
  @IsNotEmpty()
  @IsUUID()
  id_usuario: string;
}
