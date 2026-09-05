import { ProfileEntity } from 'src/modules/profile/entities';
import { SongEntity } from 'src/modules/song/entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  picture: string | null;

  @Column({ default: false })
  private: boolean;

  @ManyToMany(() => SongEntity, (song) => song.playlists)
  @JoinTable({
    name: 'playlist_songs',
    joinColumn: {
      name: 'playlistId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'songId',
      referencedColumnName: 'id',
    },
  })
  songs: SongEntity[];

  @ManyToOne(() => ProfileEntity, (profile) => profile.creatorPlaylists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdById' })
  createdBy: ProfileEntity;

  @ManyToMany(() => ProfileEntity, (profile) => profile.listenerPlaylists)
  @JoinTable({
    name: 'playlist_listeners',
    joinColumn: {
      name: 'playlistId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'profileId',
      referencedColumnName: 'id',
    },
  })
  listeners: ProfileEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.editorPlaylists)
  @JoinTable({
    name: 'playlist_editors',
    joinColumn: {
      name: 'playlistId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'profileId',
      referencedColumnName: 'id',
    },
  })
  editors: ProfileEntity[];
}
