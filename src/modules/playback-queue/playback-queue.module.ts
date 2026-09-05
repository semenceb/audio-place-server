import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaybackQueueEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([PlaybackQueueEntity])],
  exports: [TypeOrmModule],
})
export class PlaybackQueueModule {}
