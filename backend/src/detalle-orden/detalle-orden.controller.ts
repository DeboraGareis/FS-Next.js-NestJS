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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CrearDetalleOrdenDto } from './dto/crear-detalle-orden.dto';
import { DetalleOrdenService } from './detalle-orden.service';
import { ActualizarDetalleOrdenDto } from './dto/actualizar-detalle-orden.dto';

@ApiTags('Detalle Orden')
@Controller('detalle-orden')
export class DetalleOrdenController {
  constructor(private readonly detalleOrdenService: DetalleOrdenService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un detalle de orden' })
  @ApiBody({ type: CrearDetalleOrdenDto })
  async crearDetalleOrden(@Body() crearDetalleOrdenDto: CrearDetalleOrdenDto) {
    return await this.detalleOrdenService.crearDetalleOrden(
      crearDetalleOrdenDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Array de objetos de detalle de orden de la DB',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todo los detalles de orden de la DB...',
  })
  async listaDetallesDeOrden() {
    return await this.detalleOrdenService.listaDetallesDeOrden();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Conseguir 1 producto por ID de la DB' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del detalle de orden',
  })
  async buscarIdDetalleDeOrden(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.detalleOrdenService.buscarIdDetalleDeOrden(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar 1 dato del detalle de orden por ID en la DB',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del detalle de orden',
  })
  @ApiBody({ type: ActualizarDetalleOrdenDto })
  async actualizarIdDetalleDeOrden(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() actualizarDetalleOrdenDto: ActualizarDetalleOrdenDto,
  ) {
    console.log('paso');

    return await this.detalleOrdenService.actualizarIdDetalleDeOrden(
      id,
      actualizarDetalleOrdenDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar 1 detalle de orden por ID de la DB',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del detalle de orden',
  })
  async eliminarIdDetalleDeOrden(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.detalleOrdenService.eliminarIdDetalleDeOrden(id);
  }
}
