import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministradorModule } from './administrador/administrador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CarritoModule } from './carrito/carrito.module';
import { ProductoModule } from './producto/producto.module';
import { DetalleOrdenModule } from './detalle-orden/detalle-orden.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
    AdministradorModule,
    UsuarioModule,
    CarritoModule,
    ProductoModule,
    DetalleOrdenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
