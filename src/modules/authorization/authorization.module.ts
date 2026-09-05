import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { UserModule } from '../user';
import { JwtTokenModule } from '../jwt';
import { AuthorizationGuard } from './guards';
import { ProfileModule } from '../profile';

@Module({
  imports: [UserModule, JwtTokenModule, ProfileModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AuthorizationGuard],
  exports: [AuthorizationService, AuthorizationGuard],
})
export class AuthorizationModule {}
