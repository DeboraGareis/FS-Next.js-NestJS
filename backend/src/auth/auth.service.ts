import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(mail: string, pass: string,): Promise<{ access_token: string }> {
    const user = await this.prisma.usuario.findUnique({ where: { email:mail } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (isMatch!== true) {
      throw new UnauthorizedException('contraseña invalida');
    }
    
    const payload = { sub: user?.id, mail: user?.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
