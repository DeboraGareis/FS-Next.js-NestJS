import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CrearCarritoDto } from './dto/crear-carrito.dto';
import { CarritoService } from './carrito.service';
import { ActualizarCarritoDto } from './dto/actualizar-carrito.dto';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear carrito' })
  @ApiBody({ type: CrearCarritoDto })
  async crearCarrito(@Body() crearCarritoDto: CrearCarritoDto) {
    return await this.carritoService.crearCarrito(crearCarritoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Array de objetos del carrito de la DB',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todo los detalles del carrito de la DB...',
  })
  async listaDetallesDeOrden() {
    return await this.carritoService.listaDeCarrito();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Conseguir 1 detalle de CARRITO por ID de la DB' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del detalle del CARRITO',
  })
  async buscarIdCarrito(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carritoService.buscarIdCarrito(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar 1 dato del detalle del CARRITO por ID en la DB',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del detalle del CARRITO',
  })
  @ApiBody({ type: ActualizarCarritoDto })
  async actualizarIdCarrito(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() actualizarCarritoDto: ActualizarCarritoDto,
  ) {
    return await this.carritoService.actualizarIdCarrito(
      id,
      actualizarCarritoDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar 1 detalle del CARRITO por ID de la DB',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del detalle del CARRITO',
  })
  async eliminarIdDeCarrito(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.carritoService.eliminarIdDeCarrito(id);
  }
}
