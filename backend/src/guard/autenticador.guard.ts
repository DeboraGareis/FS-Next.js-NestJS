import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticadorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    if (!token) {
      throw new UnauthorizedException('Bearer No hay token');
    }
    try {
      const verificarFirma = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret: verificarFirma });
      if (!payload) {
        throw new UnauthorizedException('Error al validar el token');
      }
      request.user = payload; // preguntar que datos me envia por token para validar
      return true;
    } catch (error) {
      throw new UnauthorizedException('TOKEN inválido');
    }
  }
}
