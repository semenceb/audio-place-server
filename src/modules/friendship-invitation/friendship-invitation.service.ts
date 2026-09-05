import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FriendshipInvitationEntity } from './entities/friendship-invitation.entity';
import { FriendshipStatus } from './types';
import { ProfileDto } from '../profile/dto';
import { ProfileService } from '../profile';
import { getRandomElement } from '../../common/helpers';

@Injectable()
export class FriendshipInvitationService {
  constructor(
    @InjectRepository(FriendshipInvitationEntity)
    private friendshipInviteRepository: Repository<FriendshipInvitationEntity>,
    private readonly profileService: ProfileService,
  ) {}

  async create(senderId: number, receiverId: number): Promise<ProfileDto> {
    const guard = await this.friendshipInviteRepository.find({
      where: [
        {
          senderProfile: { id: senderId },
          receiverProfile: { id: receiverId },
          status: FriendshipStatus.PENDING,
        },
        {
          senderProfile: { id: receiverId },
          receiverProfile: { id: senderId },
          status: FriendshipStatus.PENDING,
        },
      ],
    });

    if (guard.length > 0) {
      throw new BadRequestException('Invitation already exists');
    }

    await this.friendshipInviteRepository.save(
      FriendshipInvitationEntity.fromProfiles(senderId, receiverId),
    );

    return this.profileService.findOneById(receiverId);
  }

  async acceptRequest(senderId: number, receiverId: number): Promise<void> {
    return this.advanceStatus(senderId, receiverId, FriendshipStatus.ACCEPTED);
  }

  async rejectRequest(senderId: number, receiverId: number): Promise<void> {
    return this.advanceStatus(senderId, receiverId, FriendshipStatus.REJECTED);
  }

  private async advanceStatus(
    senderId: number,
    receiverId: number,
    status: FriendshipStatus.ACCEPTED | FriendshipStatus.REJECTED,
  ): Promise<void> {
    const invitation = await this.friendshipInviteRepository.findOne({
      where: {
        senderProfile: { id: senderId },
        receiverProfile: { id: receiverId },
      },
      relations: { senderProfile: true, receiverProfile: true },
    });

    if (!invitation) {
      throw new NotFoundException('Not Found');
    }

    if (invitation.status !== FriendshipStatus.PENDING) {
      throw new BadRequestException('Bad Request');
    }

    invitation.status = status;

    await this.friendshipInviteRepository.save(invitation);
  }

  async getFriendshipInvitations(
    profileId: number,
    isSender: boolean,
  ): Promise<ProfileDto[]> {
    const criteria: FindOptionsWhere<FriendshipInvitationEntity> = {
      status: FriendshipStatus.PENDING,
    };

    if (isSender) {
      criteria.senderProfile = {
        id: profileId,
      };
    } else {
      criteria.receiverProfile = {
        id: profileId,
      };
    }

    const friendshipInvitations = await this.friendshipInviteRepository.find({
      where: criteria,
      relations: { senderProfile: true, receiverProfile: true },
    });

    return this.profileService.findManyByIds(
      friendshipInvitations.map((friendshipInvitation) =>
        isSender
          ? friendshipInvitation.receiverProfile.id
          : friendshipInvitation.senderProfile.id,
      ),
    );
  }

  async getFriends(profileId: number): Promise<ProfileDto[]> {
    const friendIds = await this.getFriendsList(profileId);
    return this.profileService.findManyByIds(friendIds);
  }

  async getSecondaryInformationFriends(
    profileId: number,
  ): Promise<ProfileDto[]> {
    const friendIds = await this.getFriendsList(profileId);

    return this.profileService.findManyByIds(
      friendIds.length <= 3 ? friendIds : getRandomElement(friendIds, 3),
    );
  }

  // getRandomItems(array: number[], count = 3): number[] {
  //   const copy = [...array];
  //
  //   for (let i = copy.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //
  //     [copy[i], copy[j]] = [copy[j], copy[i]];
  //   }
  //
  //   return copy.slice(0, Math.min(count, copy.length));
  // }

  async getFriendsList(profileId: number): Promise<number[]> {
    const friendshipSenderInvitation =
      await this.friendshipInviteRepository.find({
        where: [
          {
            senderProfile: { id: profileId },
            status: FriendshipStatus.ACCEPTED,
          },
          {
            receiverProfile: { id: profileId },
            status: FriendshipStatus.ACCEPTED,
          },
        ],
        relations: { senderProfile: true, receiverProfile: true },
      });

    const friendIds = friendshipSenderInvitation.map((friendshipInvitation) =>
      friendshipInvitation.senderProfile.id === profileId
        ? friendshipInvitation.receiverProfile.id
        : friendshipInvitation.senderProfile.id,
    );
    return friendIds;
  }
}
