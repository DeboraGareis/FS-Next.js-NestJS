import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CrearDetalleOrdenDto {
  @ApiProperty({ description: 'Cantidad del total del detalle de orden' })
  @IsNotEmpty()
  @IsString()
  cantidad: string;

  @ApiProperty({ description: 'ID del producto' })
  @IsNotEmpty()
  @IsUUID()
  id_producto: string;

  @ApiProperty({ description: 'ID del carrito' })
  @IsNotEmpty()
  @IsUUID()
  id_carrito: string;

  @ApiProperty({ description: 'Precio del total del detalle de orden' })
  @IsNotEmpty()
  @IsNumber()
  precio: number;
}
