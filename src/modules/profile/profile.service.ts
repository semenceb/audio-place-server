import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities';
import { In, Like, Not, Repository } from 'typeorm';
import { ProfileDto } from './dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async create(name: string) {
    const entity = await this.profileRepository.save({
      name,
    });
    return new ProfileDto(entity);
  }

  async findAll(): Promise<ProfileDto[]> {
    const entities = await this.profileRepository.find();

    return entities.map((entity) => new ProfileDto(entity));
  }

  async findOneByUserId(id: number) {
    const entity = await this.profileRepository.findOne({
      where: { user: { id } },
    });

    if (!entity) {
      throw new NotFoundException('Profile does not exist');
    }

    return new ProfileDto(entity);
  }

  async findOneById(id: number) {
    const entity = await this.profileRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Profile does not exist');
    }

    return new ProfileDto(entity);
  }

  async findManyByIds(ids: number[]): Promise<ProfileDto[]> {
    const entities = await this.profileRepository.findBy({
      id: In(ids),
    });

    return entities.map((entity) => new ProfileDto(entity));
  }

  async findAllByName(text: string, id: number) {
    const entities = await this.profileRepository.find({
      where: { name: Like(`%${text}%`), id: Not(id) },
    });

    return entities.map((entity) => new ProfileDto(entity));
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    await this.profileRepository.update({ id }, dto);

    const updatedProfile = await this.profileRepository.findOne({
      where: { id },
    });

    if (!updatedProfile) {
      throw new NotFoundException('Profile does not exist');
    }

    return new ProfileDto(updatedProfile);
  }

  async delete(id: number) {
    await this.profileRepository.delete({
      user: {
        id,
      },
    });
  }
}
