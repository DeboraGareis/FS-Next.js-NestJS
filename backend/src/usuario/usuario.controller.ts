import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuario, UpdateMail } from './dto/crear_usuario.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AutenticadorGuard } from 'src/guard/autenticador.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  

  @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    @ApiBody({ type: CreateUsuario })
  async create(@Body() crearUsuarioDto: CreateUsuario) {
    return await this.usuarioService.create(crearUsuarioDto);
  }


  @Get()
  @UseGuards(AutenticadorGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Array de usuarios de la DB' })
  getAllList() {
    return this.usuarioService.getAllList();
  }


  @Get(':id')
    @ApiOperation({summary: 'Obtiene un usuario de la DB segun su ID'})
    @ApiParam({
      name: 'id',
      required: true,
      description: 'El id del usuario a obtener',
    })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usuarioService.getById(id);
  }


  @Put(':id')
  @ApiOperation({summary: 'Actualiza el mail de un usuario de la DB segun su ID' })
  @ApiParam({
      name: 'id',
      required: true,
      description: 'El id del usuario al que actualizamos su mail',
    })
  @ApiBody({ type: UpdateMail })
  updateMailById(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateMail: UpdateMail) {
    return this.usuarioService.updateMailById(id, updateMail.email);
  }


  @Delete(':id')
    @ApiOperation({summary: 'Eliminar usuario por ID de la DB' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'El id del usuario a eliminar',
    })
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usuarioService.deleteById(id);
  }
}
