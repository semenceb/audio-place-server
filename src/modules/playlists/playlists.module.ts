import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  exports: [TypeOrmModule],
})
export class PlaylistsModule {}
