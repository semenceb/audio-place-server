import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.cookies?.[data] as string;
  },
);
