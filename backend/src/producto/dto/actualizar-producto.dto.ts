import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarProductoDto {
  @ApiProperty({ description: 'OPCIONAL-ID de categoria' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiProperty({ description: 'OPCIONAL-Nombre del producto' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ description: 'OPCIONAL-Cantidad o Stock del producto' })
  @IsOptional()
  @IsString()
  stock?: string;

  @ApiProperty({ description: 'OPCIONAL-Imagen del producto' })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiProperty({ description: 'OPCIONAL-Precio del producto' })
  @IsOptional()
  @IsString()
  precio?: string;
}
