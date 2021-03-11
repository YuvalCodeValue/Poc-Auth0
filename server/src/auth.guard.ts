import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: any): any {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler());
    if (!scopes) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasScope = () => user.scopes.some((scope) => scopes.includes(scope));
    return user && user.scopes && hasScope();
  }
}
