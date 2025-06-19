import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministradorModule } from './administrador/administrador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CarritoModule } from './carrito/carrito.module';
import { ProductoModule } from './producto/producto.module';
import { DetalleOrdenModule } from './detalle-orden/detalle-orden.module';

@Module({
  imports: [AdministradorModule, UsuarioModule, CarritoModule, ProductoModule, DetalleOrdenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
