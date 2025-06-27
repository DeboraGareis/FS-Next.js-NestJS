import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProducto } from './dto/crear_producto.dto';

@Injectable()
export class ProductoService {

    constructor(private readonly prismaService: PrismaService) {}
        
    create(createProductoDto: CreateProducto) {
    return this.prismaService.producto.create({
        data: {
        categoria: createProductoDto.categoria,
        nombre: createProductoDto.nombre,
        stock: createProductoDto.stock,
        imagen: createProductoDto.imagen,
        precio: createProductoDto.precio
        },
    });
    }

    getById(id:string) {
        const producto = this.prismaService.producto.findFirst({where: {id: id}})
        return producto
    }

    getAllList() {
        return this.prismaService.producto.findMany()
    }
        
    updatePrecioById(id:string, precio:number) {
        const producto = this.prismaService.producto.update({where: {id: id}, data: {precio:precio}})
        return producto
    }

    updateStockById(id:string, stock:number) {
        const producto = this.prismaService.producto.update({where: {id: id}, data: {stock:stock}})
        return producto
    }

    deleteById(id:string) {
        const producto = this.prismaService.producto.delete({where: {id: id}})
        return producto
    }
}
