import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuario, UpdateMail } from './dto/crear_usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Post()
  async create(@Body() crearUsuarioDto: CreateUsuario) {
    return await this.usuarioService.create(crearUsuarioDto);
  }

  @Get()
  getAllList() {
    return this.usuarioService.getAllList();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usuarioService.getById(id);
  }

  @Put(':id')
  updateMailById(@Param('id') id: string, @Body() updateMail: UpdateMail) {
    return this.usuarioService.updateMailById(id, updateMail.email);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usuarioService.deleteById(id);
  }
}
