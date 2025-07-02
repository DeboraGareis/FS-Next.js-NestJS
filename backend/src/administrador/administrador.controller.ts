import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CrearAdministrador } from './dto/crear-administrador.dto';
import { ActualizarAdministrador } from './dto/actualizar-administrador';

@Controller('administrador')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}
  @Post()
  @ApiOperation({ summary: 'Crear administrador' })
  @ApiBody({ type: CrearAdministrador })
  async crearAdministrador(
    @Body() crearAdministradorDto: CrearAdministrador,
  ): Promise<
    | {
        id: string;
        nombre: string;
        email: string;
      }
    | undefined
  > {
    return await this.administradorService.crearAdministrador(
      crearAdministradorDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Array de administradores de la DB' })
  async listaDeAdministradores(): Promise<
    {
      id: string;
      nombre: string;
      email: string;
    }[]
  > {
    return await this.administradorService.listaDeAdministradores();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un administrador de la DB segun su ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del administrador a obtener',
  })
  async buscarIdAdministrador(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{
    id: string;
    nombre: string;
    email: string;
  }> {
    return await this.administradorService.buscarIdAdministrador(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza datos del administrador' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del administrador',
  })
  @ApiBody({ type: ActualizarAdministrador })
  async actualizarDatosAdministrador(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() actualizarAdministrador: ActualizarAdministrador,
  ): Promise<{
    id: string;
    nombre: string;
    email: string;
  }> {
    return await this.administradorService.actualizarDatosAdministrador(
      id,
      actualizarAdministrador,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar administrador por ID de la DB' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El id del administrador a eliminar',
  })
  async eliminarAdministrador(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{
    message: string;
  }> {
    return await this.administradorService.eliminarAdministrador(id);
  }
}
