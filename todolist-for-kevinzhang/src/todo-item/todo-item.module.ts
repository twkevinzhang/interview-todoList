import { Module } from '@nestjs/common';
import { TodoItemResolvers } from 'src/todo-item/todo-item.resolvers';
import { TodoItemService } from 'src/todo-item//todo-item.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TodoItemRepo } from 'src/todo-item/todo-item.repo';
import { UserModule } from 'src/user/user.module';
import { TaskListModule } from 'src/task-list/task-list.module';

@Module({
  providers: [TodoItemResolvers, TodoItemService, TodoItemRepo],
  imports: [PrismaModule, UserModule, TaskListModule],
})
export class TodoItemModule {}
