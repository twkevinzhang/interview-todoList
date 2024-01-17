import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskListRepo } from './task-list.repo';
import { TaskListService } from './task-list.service';

@Module({
  providers: [TaskListService, TaskListRepo],
  imports: [PrismaModule],
  exports: [TaskListService],
})
export class TaskListModule {}
