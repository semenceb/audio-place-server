import { AlbumEntity } from 'src/modules/album/entities';
import { AuthorEntity } from 'src/modules/author/entities';
import { PlaybackQueueEntity } from 'src/modules/playback-queue/entities';
import { PlaylistEntity } from 'src/modules/playlists/entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  song: string;

  @ManyToMany(() => AuthorEntity, (author) => author.songs)
  @JoinTable({
    name: 'song_authors',
    joinColumn: {
      name: 'songId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'authorId',
      referencedColumnName: 'id',
    },
  })
  authors: AuthorEntity[];

  @ManyToOne(() => AlbumEntity, (album) => album.songs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.songs)
  playlists: PlaylistEntity[];

  @ManyToMany(() => PlaybackQueueEntity, (playbackQueue) => playbackQueue.songs)
  playbackQueues: PlaybackQueueEntity[];
}
