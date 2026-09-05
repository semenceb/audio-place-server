import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { AuthorizationGuard } from '../authorization/guards';
import { UploadService } from './upload.service';

@UseGuards(AuthorizationGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req: Request, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException('Разрешены только файлы изображений!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не был загружен');
    }

    return this.uploadService.buildUrl(file.path);
  }

  @Post('audio')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: './uploads/audio',
        filename: (req: Request, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);

          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          !file.mimetype.match(
            /^audio\/(mpeg|mp3|wav|ogg|aac|x-wav|flac|webm)$/,
          )
        ) {
          return cb(
            new BadRequestException(
              'Разрешены только аудиофайлы (mp3, wav, ogg, aac, flac, webm)!',
            ),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  uploadAudio(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не был загружен');
    }

    return this.uploadService.buildUrl(file.path);
  }
}
