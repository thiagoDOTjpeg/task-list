import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { ResponseTaskDto } from 'src/tasks/dto/response-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Task, ResponseTaskDto);
      createMap(
        mapper,
        CreateTaskDto,
        Task,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, UpdateTaskDto, Task);
    };
  }
}
