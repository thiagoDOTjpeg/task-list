import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @AutoMap()
  username: string;

  @IsString()
  @AutoMap()
  password: string;
}
