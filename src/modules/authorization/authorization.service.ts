import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user';
import { AuthorizedUserDto, LoginDto, RegistrationDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtTokenService } from '../jwt';
import { UserJwtPayload } from '../user/types';
import { ProfileService } from '../profile';
import { ProfileDto } from '../profile/dto';

@Injectable()
export class AuthorizationService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly profileService: ProfileService,
  ) {}

  public async registration(dto: RegistrationDto) {
    const { email, password, name } = dto;
    const exists = await this.userService.existsByEmail(email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 4);

    const profile = await this.profileService.create(name);
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      profileId: profile.id,
    });

    return this.authorizeUser(
      { id: user.id, profileId: profile.id, email: user.email },
      profile,
    );
  }

  public async login(dto: LoginDto) {
    const { email, password } = dto;
    const candidate = await this.userService.findByEmail(email);
    if (!candidate) {
      throw new BadRequestException('User email does not match');
    }
    const passwordsEqual = await bcrypt.compare(password, candidate.password);
    if (!passwordsEqual) {
      throw new BadRequestException('User password does not match');
    }
    const profile = await this.profileService.findOneByUserId(candidate.id);

    return this.authorizeUser(
      { id: candidate.id, profileId: profile.id, email: candidate.email },
      profile,
    );
  }

  public async logout(refreshToken: string): Promise<void> {
    await this.jwtTokenService.deleteToken(refreshToken);
  }

  public async authorizeUser(payload: UserJwtPayload, profile: ProfileDto) {
    const tokensDto = this.jwtTokenService.createToken(payload);
    await this.jwtTokenService.saveToken(payload.id, tokensDto.refreshToken);

    return new AuthorizedUserDto(profile, tokensDto);
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('User unauthorized');
    }

    const userData = this.jwtTokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw new UnauthorizedException('User unauthorized');
    }

    const profile = await this.profileService.findOneByUserId(userData.id);

    return this.authorizeUser(
      { id: userData.id, profileId: profile.id, email: userData.email },
      profile,
    );
  }
}
