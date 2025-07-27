import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) { }

  async create(createTaskDto: CreateTaskDto, request: Request): Promise<Task> {
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
      throw new Error('Authorization header not found');
    }
    const [type, token] = authHeader.split(' ');
    const decodedToken = this.jwtService.decode<JwtPayload>(token);
    const user = await this.usersService.findByUsername(decodedToken.username);
    if (!user) {
      throw new NotFoundException(
        `User with the username ${decodedToken.username} not found`,
      );
    }
    const task = this.taskRepository.create(createTaskDto);
    task.user = user;
    return this.taskRepository.save(task);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await this.taskRepository.findAndCount({
      skip: skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { message: `Task with ID ${id} has been deleted` };
  }
}
