import { Module } from '@nestjs/common';
import {
  CommentResolvers,
  TodoItemResolvers,
} from 'src/todo-item/todo-item.resolvers';
import { TodoItemService } from 'src/todo-item//todo-item.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TodoItemRepo } from 'src/todo-item/todo-item.repo';
import { UserModule } from 'src/user/user.module';
import { TaskListModule } from 'src/task-list/task-list.module';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    TodoItemResolvers,
    TodoItemService,
    TodoItemRepo,
    CommentResolvers,
    ConfigService,
  ],
  imports: [PrismaModule, UserModule, TaskListModule],
})
export class TodoItemModule {}
