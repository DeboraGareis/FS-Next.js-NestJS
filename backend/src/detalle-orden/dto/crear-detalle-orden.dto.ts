import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CrearDetalleOrdenDto {
  @ApiProperty({
    description: 'Cantidad del total del detalle de orden',
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  cantidad: string;

  @ApiProperty({ description: 'ID del producto', example: 'UUID' })
  @IsNotEmpty()
  @IsUUID()
  id_producto: string;

  @ApiProperty({ description: 'ID del carrito', example: 'UUID' })
  @IsNotEmpty()
  @IsUUID()
  id_carrito: string;

  @ApiProperty({
    description: 'Precio del total del detalle de orden',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  precio: number;
}
