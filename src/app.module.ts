import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { UploadModule } from './modules/upload';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendshipInvitationModule } from './modules/friendship-invitation/friendship-invitation.module';
import { AlbumModule } from './modules/album';
import { AuthorModule } from './modules/author';
import { PlaylistsModule } from './modules/playlists';
import { SongModule } from './modules/song';
import { PlaybackQueueModule } from './modules/playback-queue';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development.local'
          : '.env.production.local',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthorizationModule,
    UploadModule,
    FriendshipInvitationModule,
    AlbumModule,
    AuthorModule,
    PlaylistsModule,
    SongModule,
    PlaybackQueueModule,
  ],
})
export class AppModule {}
