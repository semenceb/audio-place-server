import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreationInput } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(input: UserCreationInput): Promise<UserEntity> {
    return this.userRepository.save({
      email: input.email,
      password: input.password,
      profile: {
        id: input.profileId,
      },
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.userRepository.exists({
      where: {
        email,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async deleteUser(id: number) {
    return this.userRepository.delete({
      id: id,
    });
  }
}
