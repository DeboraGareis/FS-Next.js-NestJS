import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { ProductoService } from 'src/producto/producto.service';

@Injectable()
export class DetalleOrdenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productoService: ProductoService,
  ) {}

  async crearDetalleOrden(crearDetalleOrden) {
    try {
      const { cantidad, id_carrito, id_producto, precio } = crearDetalleOrden;

      const id_producto_db =
        await this.productoService.buscarIdProducto(id_producto);

      if (!id_producto_db?.id) {
        throw new NotFoundException(
          `Producto con id ${id_producto} no encontrado`,
        );
      }

      const nuevoDetalleOrden = await this.prismaService.detalleOrden.create({
        data: {
          cantidad,
          producto: {
            connect: { id: id_producto },
          },
          carrito: {
            connect: { id: id_carrito },
          },
          precio,
        },
      });

      return nuevoDetalleOrden;
    } catch (error) {
      if (error instanceof NotFoundError) {
        console.log(error);

        throw error;
      }
      console.log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async listaDetallesDeOrden() {
    try {
      return this.prismaService.detalleOrden.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async buscarIdDetalleDeOrden(id: string) {
    try {
      return await this.prismaService.detalleOrden.findUnique({
        where: { id: id },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async actualizarIdDetalleDeOrden(id: string, actualizarDetalleOrdenDto) {
    try {
      const { cantidad, id_carrito, id_producto, precio } =
        actualizarDetalleOrdenDto;
      const data: any = {};
      if (cantidad !== undefined) data.cantidad = cantidad;
      if (id_carrito !== undefined) data.id_carrito = id_carrito;
      if (id_producto !== undefined) data.id_producto = id_producto;
      if (precio !== undefined) data.precio = precio;
      console.log(data.producto);
      console.log(data.id_producto);

      const detalleOrdenActualizado =
        await this.prismaService.detalleOrden.update({
          where: { id: id },
          data: data,
        });
      return detalleOrdenActualizado;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error);
    }
  }
  async eliminarIdDetalleDeOrden(id: string) {
    try {
      return await this.prismaService.detalleOrden.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
