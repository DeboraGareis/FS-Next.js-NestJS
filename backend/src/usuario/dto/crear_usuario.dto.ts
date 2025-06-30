import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuario {
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
  @IsString()
  email: string;
}

export class UpdateMail {
  @ApiProperty({
    description: 'mail del usuario',
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}
