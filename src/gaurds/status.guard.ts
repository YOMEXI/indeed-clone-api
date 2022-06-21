import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { SetMetadata } from '@nestjs/common';
import { STATUS, STATUS_KEY } from './gaurd.constant';

@Injectable()
export class RecruiterStatusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let statusCheck = this.reflector.getAllAndOverride<STATUS[]>(STATUS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();
    return req.user.status === 'recruiter';
  }
}
