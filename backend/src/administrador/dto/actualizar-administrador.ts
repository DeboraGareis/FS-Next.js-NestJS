import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ActualizarAdministrador {
  @ApiProperty({
    description: 'OPCIONAL-nombre del administrador',
  })
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'OPCIONAL-contraseña del administrador',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'OPCIONAL-mail del administrador',
  })
  @IsOptional()
  @IsEmail()
  email: string;
}
