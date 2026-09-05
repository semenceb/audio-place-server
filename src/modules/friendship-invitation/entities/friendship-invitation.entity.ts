import { ProfileEntity } from 'src/modules/profile/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendshipStatus } from '../types';

@Entity('friendship_invitation')
export class FriendshipInvitationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @JoinColumn()
  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    onDelete: 'CASCADE',
  })
  senderProfile: ProfileEntity;
  @JoinColumn()
  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    onDelete: 'CASCADE',
  })
  receiverProfile: ProfileEntity;
  @Column({
    type: 'enum',
    enum: FriendshipStatus,
    default: FriendshipStatus.PENDING,
  })
  status: FriendshipStatus;
  @CreateDateColumn()
  createdAt: Date;

  public static fromProfiles(
    senderProfileId: number,
    receiverProfileId: number,
  ): FriendshipInvitationEntity {
    const entity = new FriendshipInvitationEntity();

    entity.senderProfile = ProfileEntity.fromId(senderProfileId);
    entity.receiverProfile = ProfileEntity.fromId(receiverProfileId);

    return entity;
  }
}
