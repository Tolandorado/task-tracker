import { Injectable } from '@nestjs/common';
import { KnexService } from '../database/knex.service.js';
import { TCreateTask, TAddCompletedTaskSchema, TTask } from './dto/task.schema.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  constructor(private readonly knexService: KnexService) { }

  async createTask(createTaskDto: TCreateTask): Promise<TTask> {
    const { description } = createTaskDto;
    const [task] = await this.knexService.getKnex()('tasks')
      .insert({
        id: uuidv4(),
        description,
        start_at: new Date().toISOString(),
        status: 'active',
      })
      .returning('*');
    return task;
  }

  async stopTask(id: string): Promise<TTask> {
    const [task] = await this.knexService.getKnex()('tasks')
      .where({ id, status: 'active' })
      .update({ end_at: new Date().toISOString(), status: 'done' })
      .returning('*');
    return task;
  }

  async addCompletedTask(addCompletedTaskDto: TAddCompletedTaskSchema): Promise<TTask> {
    const { description, start_at, end_at } = addCompletedTaskDto;
    const [task] = await this.knexService.getKnex()('tasks')
      .insert({
        id: uuidv4(),
        description,
        start_at: new Date(start_at).toISOString(),
        end_at: new Date(end_at).toISOString(),
        status: 'done',
      })
      .returning('*');
    return task;
  }

  async findAllTasks(): Promise<TTask[]> {
    return this.knexService.getKnex()('tasks').select('*');
  }

  async findActiveTasks(): Promise<TTask[]> {
    return this.knexService.getKnex()('tasks').where({ status: 'active' }).select('*');
  }

  async findCompletedTasks(): Promise<TTask[]> {
    return this.knexService.getKnex()('tasks').where({ status: 'done' }).select('*');
  }
}