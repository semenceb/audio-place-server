import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile';
import { FriendshipInvitationEntity } from './entities/friendship-invitation.entity';
import { FriendshipInvitationService } from './friendship-invitation.service';
import { JwtModule } from '@nestjs/jwt';
import { FriendshipInvitationController } from './friendship-invitation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendshipInvitationEntity]),
    ProfileModule,
    JwtModule,
  ],
  controllers: [FriendshipInvitationController],
  providers: [FriendshipInvitationService],
  exports: [FriendshipInvitationService],
})
export class FriendshipInvitationModule {}
