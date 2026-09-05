import { Request } from 'express';
import { UserJwtPayload } from '../../user/types';

export type AuthorizedRequest = {
  user: UserJwtPayload;
} & Request;
