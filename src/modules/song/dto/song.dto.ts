import { SongEntity } from '../entities';
import { AlbumEntity } from '../../album';
import { AuthorEntity } from '../../author';

export class SongDto {
  id: number;
  name: string;
  song: string;
  album: AlbumEntity;
  authors: AuthorEntity[];

  constructor(entity: SongEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.song = entity.song;
    this.album = entity.album;
    this.authors = entity.authors;
  }
}
