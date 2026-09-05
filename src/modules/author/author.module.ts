import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity]), JwtModule],
  exports: [AuthorService],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
