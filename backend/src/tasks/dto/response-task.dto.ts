import { AutoMap } from '@automapper/classes';
import { User } from 'src/users/entities/user.entity';

export class ResponseTaskDto {
  @AutoMap()
  id: number;
  @AutoMap()
  title: string;
  @AutoMap()
  description: string;
  @AutoMap()
  completed: boolean;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt: Date;
  @AutoMap()
  user: User;
}
