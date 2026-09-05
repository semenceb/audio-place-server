import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor() {}

  buildUrl(path: string) {
    return `${process.env.PROTOCOL}://${process.env.HOSTNAME}:${process.env.PORT}/${path}`;
  }
}
