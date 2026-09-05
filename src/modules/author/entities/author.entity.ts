import { AlbumEntity } from 'src/modules/album/entities';
import { ProfileEntity } from 'src/modules/profile/entities';
import { SongEntity } from 'src/modules/song/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  picture: string | null;

  @ManyToOne(() => ProfileEntity, (profile) => profile.authorProfiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profileId' })
  profile: ProfileEntity;

  @ManyToMany(() => SongEntity, (song) => song.authors)
  songs: SongEntity[];

  @ManyToMany(() => AlbumEntity, (album) => album.authors)
  albums: AlbumEntity[];
}
