import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CrearProductoDto {
  @ApiProperty({ description: 'ID de categoria' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Cantidad o Stock del producto' })
  @IsString()
  @IsNotEmpty()
  stock: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @IsString()
  @IsNotEmpty()
  imagen: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsString()
  @IsNotEmpty()
  precio: string;
}
