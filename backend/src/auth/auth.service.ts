import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    mail: string,
    pass: string,
  ): Promise<{ access_token: string } | undefined> {
    const user = await this.prisma.usuario.findUnique({
      where: { email: mail },
    });
    const administrador = await this.prisma.administrador.findUnique({
      where: { email: mail },
    });

    if (!user && !administrador)
      throw new UnauthorizedException('Credenciales inválidas');

    if (user) {
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (isMatch !== true) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload = { rol: 'usuario', sub: user.id };
      const access_token = await this.jwtService.signAsync(payload);
      return { access_token };
    }
    if (administrador) {
      const isMatch = await bcrypt.compare(pass, administrador?.password);

      if (isMatch !== true) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload = { rol: 'administrador', sub: administrador.id };
      const access_token = await this.jwtService.signAsync(payload);
      return { access_token };
    }
  }
}
