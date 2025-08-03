import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersProfile } from 'shared/src/users.profile';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, UsersProfile],
})
export class UsersModule { }
