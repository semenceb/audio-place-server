import { Injectable } from '@nestjs/common';
import { SongEntity } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongCreationDto, SongDto } from './dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
  ) {}

  async create(data: SongCreationDto) {
    await this.songRepository.save(data);
  }
}
