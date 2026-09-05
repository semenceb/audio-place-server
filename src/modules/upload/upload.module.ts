import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { JwtModule } from '@nestjs/jwt';
import { UploadService } from './upload.service';

@Module({
  imports: [JwtModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
