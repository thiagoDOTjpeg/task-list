import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @AutoMap()
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @AutoMap()
  description: string;

  @IsNotEmpty({ message: 'Completion status is required' })
  @AutoMap()
  completed: boolean;
}
