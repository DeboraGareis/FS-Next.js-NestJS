import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CrearAdministrador } from './dto/crear-administrador.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ActualizarAdministrador } from './dto/actualizar-administrador';

@Injectable()
export class AdministradorService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async crearAdministrador(crearAdministradorDto: CrearAdministrador) {
    try {
      const { password, email, nombre } = crearAdministradorDto;
      const emailExiste = await this.conseguirEmail(email);
      const emailDbUsuarioExiste = await this.usuarioService.getByEmail(email);

      if (!emailExiste && !emailDbUsuarioExiste) {
        const hashpassword = await bcrypt.hash(password, 10);
        const administradorNuevo =
          await this.prismaService.administrador.create({
            data: {
              email: email,
              nombre: nombre,
              password: hashpassword,
            },
            select: {
              id: true,
              nombre: true,
              email: true,
            },
          });
        return administradorNuevo;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async conseguirEmail(email: string) {
    const emailExiste = await this.prismaService.administrador.findFirst({
      where: { email },
      select: { email: true },
    });
    if (emailExiste) {
      throw new ConflictException();
    } else {
      return false;
    }
  }

  async listaDeAdministradores() {
    try {
      const administradores = await this.prismaService.administrador.findMany({
        select: {
          id: true,
          email: true,
          nombre: true,
        },
      });
      return administradores;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async buscarIdAdministrador(id: string) {
    try {
      const administrador = await this.prismaService.administrador.findFirst({
        where: { id },
        select: { id: true, nombre: true, email: true },
      });
      if (!administrador?.id) {
        throw new NotFoundException();
      }
      return administrador;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async actualizarDatosAdministrador(
    id: string,
    actualizarAdministrador: ActualizarAdministrador,
  ) {
    const { nombre, email, password } = actualizarAdministrador;
    try {
      const data: any = {};
      if (nombre !== undefined) data.nombre = nombre;
      if (email !== undefined) data.email = email;
      if (password !== undefined) data.password = password;

      const administradorActualizado =
        await this.prismaService.administrador.update({
          where: { id },
          data: data,
          select: {
            id: true,
            email: true,
            nombre: true,
          },
        });
      return administradorActualizado;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async eliminarAdministrador(id: string) {
    try {
      await this.prismaService.administrador.delete({ where: { id } });
      return { message: 'Administrador eliminado' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new InternalServerErrorException();
    }
  }
}
