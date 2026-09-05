import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user';
import { FriendshipInvitationEntity } from '../../friendship-invitation/entities/friendship-invitation.entity';
import { PlaylistEntity } from '../../playlists/entities';
import { PlaybackQueueEntity } from '../../playback-queue/entities';
import { AuthorEntity } from '../../author/entities';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'text', nullable: true })
  about: string | null;
  @Column({ type: 'text', nullable: true })
  profilePicture: string | null;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
  @OneToMany(
    () => FriendshipInvitationEntity,
    (friendship) => friendship.senderProfile,
  )
  sentFriendRequests: FriendshipInvitationEntity[] | null;
  @OneToMany(
    () => FriendshipInvitationEntity,
    (friendship) => friendship.receiverProfile,
  )
  receivedProfileId: FriendshipInvitationEntity[] | null;
  @OneToOne(
    () => PlaybackQueueEntity,
    (playbackQueue) => playbackQueue.listener,
    {
      nullable: true,
    },
  )
  @JoinColumn()
  playbackQueue: PlaybackQueueEntity | null;
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.createdBy)
  creatorPlaylists: PlaylistEntity[];
  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.listeners)
  listenerPlaylists: PlaylistEntity[];
  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.editors)
  editorPlaylists: PlaylistEntity[];
  @OneToMany(() => AuthorEntity, (author) => author.profile)
  authorProfiles: AuthorEntity[];

  public static fromId(id: number): ProfileEntity {
    const entity = new ProfileEntity();

    entity.id = id;

    return entity;
  }
}
