import { AutoMap } from '@automapper/classes';
import { Task } from 'src/tasks/entities/task.entity';

export class ResponseUserDto {
  @AutoMap()
  id: number;
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt: Date;
  @AutoMap()
  tasks: Task[];
}
