import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuario } from './dto/crear_usuario.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuario) {
    try{
        const { password } = createUsuarioDto;
    const hashpassword = await bcrypt.hash(password, 10);
    return await this.prismaService.usuario.create({
      data: {
        email: createUsuarioDto.email,
        nombre: createUsuarioDto.nombre,
        password: hashpassword,
      },
    });
    }
    catch (error) {
          throw new InternalServerErrorException();
        }
  }
 
  getById(id: string) {
    try{
        const user = this.prismaService.usuario.findFirst({ where: { id: id } });
        return user;
    }
    catch (error) {
          throw new InternalServerErrorException();
        }
  }

 
  getAllList() {
    try{
        return this.prismaService.usuario.findMany();
    }
    catch (error) {
          throw new InternalServerErrorException();
        }
  }

  updateMailById(id: string, mail: string) {
    try{
        const user = this.prismaService.usuario.update({
      where: { id: id },
      data: { email: mail },
    });
    return user;
    }
    catch (error) {
          throw new InternalServerErrorException();
    }
  }

  deleteById(id: string) {
    try{
        const user = this.prismaService.usuario.delete({ where: { id: id } });
        return user;
    }
    catch (error) {
          throw new InternalServerErrorException();
        }
  }
}
