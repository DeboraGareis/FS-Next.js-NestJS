import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { PrismaService } from 'src/prisma.service';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Injectable()
export class ProductoService {
  constructor(private readonly prismaService: PrismaService) {}

  async crearProducto(crearProductoDto: CrearProductoDto) {
    try {
      const productoNuevo = await this.prismaService.producto.create({
        data: {
          categoria: crearProductoDto.categoria,
          nombre: crearProductoDto.nombre,
          stock: Number(crearProductoDto.stock),
          imagen: crearProductoDto.imagen,
          precio: Number(crearProductoDto.precio),
        },
      });
      return productoNuevo;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async listaDeProducto() {
    try {
      return await this.prismaService.producto.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async buscarIdProducto(id: string) {
    try {
      return await this.prismaService.producto.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el producto con id: ${id}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async actualizarIdProducto(
    id: string,
    actualizarProductoDto: ActualizarProductoDto,
  ) {
    try {
      const { categoria, imagen, precio, nombre, stock } =
        actualizarProductoDto;
      const data: any = {};
      if (categoria !== undefined) data.categoria = categoria;
      if (imagen !== undefined) data.imagen = imagen;
      if (precio !== undefined) data.precio = Number(precio);
      if (nombre !== undefined) data.nombre = nombre;
      if (stock !== undefined) data.stock = Number(stock);

      const productoActualizado = await this.prismaService.producto.update({
        where: { id: id },
        data: data,
      });
      return productoActualizado;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el producto con id: ${id}`);
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async eliminarIdProducto(id: string) {
    try {
      return await this.prismaService.producto.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma: registro no encontrado
        throw new NotFoundException(`No se encontró el producto con id: ${id}`);
      }
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }
}
