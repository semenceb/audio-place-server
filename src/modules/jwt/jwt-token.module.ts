import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenEntity } from './entities';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([JwtTokenEntity])],
  providers: [JwtTokenService, JwtService],
  exports: [JwtTokenService, JwtService],
})
export class JwtTokenModule {}
