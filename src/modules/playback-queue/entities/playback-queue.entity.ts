import { ProfileEntity } from 'src/modules/profile/entities';
import { SongEntity } from 'src/modules/song/entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playback_queues')
export class PlaybackQueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ProfileEntity, (profile) => profile.playbackQueue)
  listener: ProfileEntity;

  @ManyToMany(() => SongEntity, (song) => song.playbackQueues)
  @JoinTable({
    name: 'playback_queue_songs',
    joinColumn: {
      name: 'playbackQueueId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'songId',
      referencedColumnName: 'id',
    },
  })
  songs: SongEntity[];

  @Column({ default: 0 })
  currentSongIndex: number;
}
