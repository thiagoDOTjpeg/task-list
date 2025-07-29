import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @AutoMap()
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @AutoMap()
  description: string;
}
