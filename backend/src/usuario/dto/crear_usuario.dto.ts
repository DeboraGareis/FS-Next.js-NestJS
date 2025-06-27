import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuario {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class UpdateMail {
  email: string;
}
