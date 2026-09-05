import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthorizationGuard } from '../authorization/guards';
import type { AuthorizedRequest } from '../authorization/types';
import { UpdateProfileDto } from './dto/update-profile.dto';

@UseGuards(AuthorizationGuard)
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  public async getProfiles() {
    return this.profileService.findAll();
  }

  @Get('found')
  public async getFoundProfiles(
    @Query('text') text: string,
    @Req() request: AuthorizedRequest,
  ) {
    return this.profileService.findAllByName(text, request.user.id);
  }

  @Get('/:id')
  public async getProfile(@Param('id') id: string) {
    return this.profileService.findOneById(Number(id));
  }

  @Patch()
  public async updateProfile(
    @Req() request: AuthorizedRequest,
    @Body() body: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(request.user.profileId, body);
  }

  @Delete()
  public async deleteProfile(@Req() request: AuthorizedRequest) {
    return this.profileService.delete(request.user.id);
  }
}
