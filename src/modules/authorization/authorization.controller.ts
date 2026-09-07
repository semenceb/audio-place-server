import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { LoginDto, RegistrationDto } from './dto';
import type { Response } from 'express';
import { Cookies } from '../../common/decorators';

@Controller('authorization')
export class AuthorizationController {
  public constructor(
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Post('/register')
  public async create(
    @Body() body: RegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const dto = await this.authorizationService.registration(body);

    this.setRefreshTokenCookie(response, dto.tokens.refreshToken)

    return dto;
  }

  @Post('/login')
  public async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const dto = await this.authorizationService.login(body);

    this.setRefreshTokenCookie(response, dto.tokens.refreshToken)

    return dto;
  }

  @Delete('/logout')
  public async logout(
    @Res({ passthrough: true }) response: Response,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    response.clearCookie('refreshToken');
    return this.authorizationService.logout(refreshToken);
  }

  @Get('/refresh')
  public async refresh(
    @Res({ passthrough: true }) response: Response,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    const dto = await this.authorizationService.refresh(refreshToken);

    this.setRefreshTokenCookie(response, dto.tokens.refreshToken)

    return dto;
  }

  private setRefreshTokenCookie(response: Response, value: string) {
    response.cookie('refreshToken', value, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: 'strict',
    });
  }
}
