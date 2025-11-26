import { Controller, Post, Body, Get } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskSchema, StopTaskSchema, AddCompletedTaskSchema, type TCreateTask, type TStopTask, type TAddCompletedTaskSchema } from './dto/task.schema.js';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async create(@Body(new ZodValidationPipe(CreateTaskSchema)) createTaskDto: TCreateTask) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Post('stop')
  async stop(@Body(new ZodValidationPipe(StopTaskSchema)) stopTaskDto: TStopTask) {
    return this.tasksService.stopTask(stopTaskDto.id);
  }

  @Post('completed')
  async addCompleted(@Body(new ZodValidationPipe(AddCompletedTaskSchema)) addCompletedTaskDto: TAddCompletedTaskSchema) {
    return this.tasksService.addCompletedTask(addCompletedTaskDto);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAllTasks();
  }
}
