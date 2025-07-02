import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ActualizarCarritoDto {
  @ApiProperty({
    description: 'OPCIONAL-Fecha de carrito',
    example: '2025-06-27',
  })
  @IsOptional()
  @IsISO8601()
  fecha: string;

  @ApiProperty({
    description: 'OPCIONAL-Total del carrito',
    example: '10000',
  })
  @IsOptional()
  @IsString()
  total: string;

  @ApiProperty({
    description: 'OPCIONAL-ID de usuario al que pertenece el carrito',
    example: 'UUID',
  })
  @IsOptional()
  @IsUUID()
  id_usuario: string;
}
