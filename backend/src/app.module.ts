import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module.js';
import { DatabaseModule } from './database/database.module.js';

@Module({
  imports: [TasksModule, DatabaseModule],
})
export class AppModule { }
