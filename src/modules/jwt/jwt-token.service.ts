import { Injectable } from '@nestjs/common';
import { JwtTokenDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from '../user/types';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenEntity } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtTokenService {
  constructor(
    @InjectRepository(JwtTokenEntity)
    private jwtTokenRepository: Repository<JwtTokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public createToken(payload: UserJwtPayload): JwtTokenDto {
    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        expiresIn: '60m',
        secret: process.env.JWT_ACCESS_SECRET,
      },
    );
    const refreshToken = this.jwtService.sign(
      { ...payload },
      {
        expiresIn: '90d',
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );
    return new JwtTokenDto(accessToken, refreshToken);
  }

  public async saveToken(userId: number, refreshToken: string): Promise<void> {
    const result = await this.jwtTokenRepository.update(
      { userId },
      { refreshToken },
    );
    if (!result.affected) {
      const entity = new JwtTokenEntity(userId, refreshToken);
      await this.jwtTokenRepository.save(entity);
    }
  }

  public validateRefreshToken(refreshToken: string): UserJwtPayload {
    return this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  public async deleteToken(refreshToken: string): Promise<void> {
    await this.jwtTokenRepository.delete({
      refreshToken,
    });
  }
}
