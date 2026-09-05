import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationGuard } from '../authorization/guards';
import { FriendshipInvitationService } from './friendship-invitation.service';
import type { AuthorizedRequest } from '../authorization/types';
import { ProfileDto } from '../profile/dto';

@UseGuards(AuthorizationGuard)
@Controller('friends')
export class FriendshipInvitationController {
  constructor(
    private readonly friendshipInvitationService: FriendshipInvitationService,
  ) {}

  @Get('/invitations')
  public async getFriendshipInvitations(
    @Req() request: AuthorizedRequest,
    @Query('sender', ParseBoolPipe) isSender: boolean,
  ): Promise<ProfileDto[]> {
    return this.friendshipInvitationService.getFriendshipInvitations(
      request.user.profileId,
      isSender,
    );
  }

  @Get('/:id')
  public async getFriends(@Param('id', ParseIntPipe) id: number) {
    return this.friendshipInvitationService.getFriends(id);
  }

  @Get('/secondary/:id')
  public async getSecondaryInformationFriends(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendshipInvitationService.getSecondaryInformationFriends(id);
  }

  @Post('/:id/invite')
  public async createFriendshipInvitation(
    @Param('id', ParseIntPipe) receiverId: number,
    @Req() request: AuthorizedRequest,
  ) {
    return this.friendshipInvitationService.create(
      request.user.profileId,
      receiverId,
    );
  }

  @Put('/:id/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async acceptFriendshipInvitation(
    @Param('id', ParseIntPipe) senderId: number,
    @Req() request: AuthorizedRequest,
  ) {
    return this.friendshipInvitationService.acceptRequest(
      senderId,
      request.user.profileId,
    );
  }

  @Put('/:id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async rejectFriendshipInvitation(
    @Param('id', ParseIntPipe) senderId: number,
    @Req() request: AuthorizedRequest,
  ) {
    return this.friendshipInvitationService.rejectRequest(
      senderId,
      request.user.profileId,
    );
  }
}
