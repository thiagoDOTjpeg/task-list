import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @AutoMap()
  username: string;
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email is required' })
  @AutoMap()
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @AutoMap()
  password: string;
}
