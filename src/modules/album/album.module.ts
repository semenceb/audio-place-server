import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
