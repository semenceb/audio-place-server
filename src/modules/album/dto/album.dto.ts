import { AuthorEntity } from '../../author';
import { SongDto } from '../../song/dto';
import { AlbumEntity } from '../entities';

export class AlbumDto {
  id: number;
  name: string;
  picture: string | null;
  authors: AuthorEntity[];
  songs: SongDto[] | null;

  constructor(entity: AlbumEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.picture = entity.picture;
    this.authors = entity.authors;
    this.songs = entity.songs;
  }
}
