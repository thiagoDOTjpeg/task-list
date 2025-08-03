import { AutoMap } from '@automapper/classes';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ unique: true, nullable: false })
  @AutoMap()
  username: string;

  @Column({ unique: true, nullable: false })
  @AutoMap()
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn()
  @AutoMap()
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  @AutoMap()
  tasks: Task[];
}
