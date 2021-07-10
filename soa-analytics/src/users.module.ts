import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginService } from './login.service';

@Module({
  providers: [UsersService, LoginService],
  exports: [UsersService],
})
export class UsersModule {}