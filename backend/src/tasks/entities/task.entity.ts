import { AutoMap } from '@automapper/classes';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  title: string;

  @Column({ nullable: true })
  @AutoMap()
  description: string;

  @Column({ default: false })
  @AutoMap()
  completed: boolean;

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn()
  @AutoMap()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  @AutoMap()
  user: User;
}
