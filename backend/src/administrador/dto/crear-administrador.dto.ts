import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CrearAdministrador {
  @ApiProperty({
    description: 'nombre del usuario',
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'contraseña del usuario',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'mail del usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
