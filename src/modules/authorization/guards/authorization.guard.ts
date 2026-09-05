import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('User unauthorized.');
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('User unauthorized.');
    }
    try {
      req['user'] = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return true;
    } catch (_) {
      throw new UnauthorizedException('User unauthorized.');
    }
  }
}
