import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entities';
import { Repository } from 'typeorm';
import { AuthorCreationDto, AuthorDto } from './dto';
import { getRandomElement } from '../../common/helpers';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorService: Repository<AuthorEntity>,
  ) {}

  async create(profileId: number, data: AuthorCreationDto): Promise<AuthorDto> {
    const response = await this.authorService.save({
      profile: {
        id: profileId,
      },
      name: data.name,
      picture: data.picture,
    });

    return new AuthorDto(response);
  }

  async getAuthor(id: number): Promise<AuthorDto> {
    const response = await this.authorService.findOne({
      where: { id },
    });
    if (!response) {
      throw new NotFoundException('Not Found');
    }
    return new AuthorDto(response);
  }

  async getAuthors(profileId: number): Promise<AuthorDto[]> {
    const response = await this.authorService.findBy({
      profile: {
        id: profileId,
      },
    });

    return response.length <= 3
      ? response.map((author) => new AuthorDto(author))
      : getRandomElement(response, 3).map((author) => new AuthorDto(author));
  }
}
