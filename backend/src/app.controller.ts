import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tasksService: TasksService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
