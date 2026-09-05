import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity } from '../song';
import { Repository } from 'typeorm';
import { SongDto } from '../song/dto';
import { AlbumEntity } from './entities';
import { AlbumCreationDto, AlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(data: AlbumCreationDto): Promise<AlbumDto> {
    const entity = await this.albumRepository.save(data);
    return new AlbumDto(entity);
  }
}
