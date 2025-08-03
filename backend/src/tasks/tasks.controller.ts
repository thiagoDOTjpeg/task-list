import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationQueryDto } from '../../shared/dto/pagination-query.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Task } from './entities/task.entity';
import { ResponseTaskDto } from './dto/response-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: JwtPayload,
  ) {
    const userEntity = await this.usersService.findOne(req.sub);
    const createdTask = await this.tasksService.create(
      createTaskDto,
      userEntity,
    );
    return this.classMapper.mapAsync(createdTask, Task, ResponseTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const result = await this.tasksService.findAll(paginationQuery);
    const mappedData = await this.classMapper.mapArrayAsync(
      result.data,
      Task,
      ResponseTaskDto,
    );
    return { ...result, data: mappedData };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classMapper.mapAsync(
      await this.tasksService.findOne(+id),
      Task,
      ResponseTaskDto,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.classMapper.mapAsync(
      await this.tasksService.update(+id, updateTaskDto),
      Task,
      ResponseTaskDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
