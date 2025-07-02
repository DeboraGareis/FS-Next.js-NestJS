import { Module } from '@nestjs/common';
import { AdministradorController } from './administrador.controller';
import { AdministradorService } from './administrador.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdministradorController],
  providers: [AdministradorService, UsuarioService, PrismaService],
})
export class AdministradorModule {}
