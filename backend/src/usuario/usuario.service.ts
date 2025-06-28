import { Injectable } from '@nestjs/common';
import { CreateUsuario } from './dto/crear_usuario.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuario) {
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
  getById(id: string) {
    const user = this.prismaService.usuario.findFirst({ where: { id: id } });
    return user;
  }

  getAllList() {
    return this.prismaService.usuario.findMany();
  }

  updateMailById(id: string, mail: string) {
    const user = this.prismaService.usuario.update({
      where: { id: id },
      data: { email: mail },
    });
    return user;
  }

  deleteById(id: string) {
    const user = this.prismaService.usuario.delete({ where: { id: id } });
    return user;
  }
}
