import { AuthorEntity } from '../entities';

export class AuthorDto {
  id: number;
  name: string;
  picture: string | null;

  constructor(entity: AuthorEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.picture = entity.picture;
  }
}
