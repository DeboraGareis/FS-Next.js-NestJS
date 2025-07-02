import { forwardRef, Module } from '@nestjs/common';
import { DetalleOrdenController } from './detalle-orden.controller';
import { DetalleOrdenService } from './detalle-orden.service';
import { PrismaService } from 'src/prisma.service';
import { ProductoService } from 'src/producto/producto.service';
import { CarritoService } from 'src/carrito/carrito.service';

@Module({
  controllers: [DetalleOrdenController],
  providers: [
    DetalleOrdenService,
    PrismaService,
    ProductoService,
    CarritoService,
  ],
})
export class DetalleOrdenModule {}
