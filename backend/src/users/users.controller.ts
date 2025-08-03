import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/constants/constants';
import { PaginationQueryDto } from 'shared/dto/pagination-query.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) { }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.classMapper.mapAsync(
      await this.usersService.create(createUserDto),
      User,
      ResponseUserDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const result = await this.usersService.findAll(paginationQuery);
    const mappedData = await this.classMapper.mapArrayAsync(
      result.data,
      User,
      ResponseUserDto,
    );
    return { ...result, data: mappedData };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.classMapper.mapAsync(
      await this.usersService.findOne(+id),
      User,
      ResponseUserDto,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.classMapper.mapAsync(
      await this.usersService.update(+id, updateUserDto),
      User,
      ResponseUserDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
