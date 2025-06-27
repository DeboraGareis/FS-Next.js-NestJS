import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ActualizarCarritoDto {
  @ApiProperty({
    description: 'OPCIONAL-Fecha de carrito',
  })
  @IsOptional()
  @IsString()
  fecha: string;

  @ApiProperty({
    description: 'OPCIONAL-Total del carrito',
  })
  @IsOptional()
  @IsString()
  total: string;

  @ApiProperty({
    description: 'OPCIONAL-ID de usuario al que pertenece el carrito',
  })
  @IsOptional()
  @IsUUID()
  id_usuario: string;
}
