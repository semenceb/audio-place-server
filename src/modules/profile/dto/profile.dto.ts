import { ProfileEntity } from '../entities';
import { FriendshipInvitationEntity } from '../../friendship-invitation/entities/friendship-invitation.entity';

export class ProfileDto implements Omit<
  ProfileEntity,
  | 'user'
  | 'friends'
  | 'playbackQueue'
  | 'creatorPlaylists'
  | 'listenerPlaylists'
  | 'editorPlaylists'
  | 'authorProfiles'
> {
  id: number;
  name: string;
  about: string | null;
  profilePicture: string | null;
  sentFriendRequests: FriendshipInvitationEntity[] | null;
  receivedProfileId: FriendshipInvitationEntity[] | null;
  createdAt: Date;
  updatedAt: Date;
  friends: ProfileDto[];

  constructor(entity: ProfileEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.about = entity.about;
    this.profilePicture = entity.profilePicture;
    this.sentFriendRequests = entity.sentFriendRequests;
    this.receivedProfileId = entity.receivedProfileId;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
