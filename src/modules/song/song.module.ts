import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  exports: [TypeOrmModule],
})
export class SongModule {}
