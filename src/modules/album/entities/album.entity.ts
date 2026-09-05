import { AuthorEntity } from 'src/modules/author/entities';
import { SongEntity } from 'src/modules/song/entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  picture: string | null;

  @ManyToMany(() => AuthorEntity, (author) => author.albums)
  @JoinTable({
    name: 'album_authors',
    joinColumn: {
      name: 'albumId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'authorId',
      referencedColumnName: 'id',
    },
  })
  authors: AuthorEntity[];

  @OneToMany(() => SongEntity, (song) => song.album)
  songs: SongEntity[];
}
