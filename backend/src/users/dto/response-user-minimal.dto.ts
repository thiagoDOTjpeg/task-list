import { AutoMap } from '@automapper/classes';

export class ResponseUserMinimalDto {
  @AutoMap()
  id: number;
  @AutoMap()
  username: string;
}
