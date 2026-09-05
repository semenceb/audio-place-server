import { JwtTokenDto } from '../../jwt/dto';
import { ProfileDto } from '../../profile/dto';

export class AuthorizedUserDto {
  public constructor(
    public readonly profile: ProfileDto,
    public readonly tokens: JwtTokenDto,
  ) {}
}
