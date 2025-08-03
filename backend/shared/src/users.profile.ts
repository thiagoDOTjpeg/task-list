import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserMinimalDto } from 'src/users/dto/response-user-minimal.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, ResponseUserDto);
      createMap(mapper, User, ResponseUserMinimalDto);
      createMap(
        mapper,
        CreateUserDto,
        User,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, UpdateUserDto, User);
    };
  }
}
