import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decoradores/roles.decorador';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiereRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiereRoles) {
      return true;
    }
    const payload = context.switchToHttp().getRequest();
    const { user } = payload; // preguntar que datos me envia por token para validar

    if (!user || !user.rol) {
      throw new ForbiddenException('No tienes el rol requerido');
    }
    if (!requiereRoles.includes(user.roles)) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso',
      );
    }
    return true;
  }
}
