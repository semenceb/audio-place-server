export class JwtTokenDto {
  public constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
