import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryProvider } from 'src/config/cloudinary';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService, PrismaService, CloudinaryProvider],
})
export class ProductoModule {}
