import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UsersModule } from 'src/users/users.module';
import { TaskProfile } from 'shared/src/task.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService, TaskProfile],
})
export class TasksModule { }
