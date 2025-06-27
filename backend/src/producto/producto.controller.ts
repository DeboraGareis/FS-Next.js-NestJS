import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProducto, UpdatePrecio, UpdateStock } from './dto/crear_producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}
     @Post()
      create(@Body() crearProductoDto: CreateProducto) {
        return this.productoService.create(crearProductoDto);
      }
    
      @Get()
      getAllList() {
        return this.productoService.getAllList();
      }
    
      @Get(':id')
      getById(@Param('id') id: string){
        return this.productoService.getById(id);
      }
    
       @Put('/precio/:id')
       updatePrecioById(@Param('id') id: string, @Body() updatePrecio: UpdatePrecio) {
        return this.productoService.updatePrecioById(id, updatePrecio.precio);
      }
    
      @Put('/stock/:id')
       updateStockById(@Param('id') id: string, @Body() updateStock: UpdateStock) {
        return this.productoService.updateStockById(id, updateStock.stock);
      }

      @Delete(':id')
       deleteById(@Param('id') id: string){
        return this.productoService.deleteById(id);
      }

}
