import { Module } from '@nestjs/common';
import { TodoItemResolvers } from 'src/todo-item/todo-item.resolvers';
import { TodoItemService } from 'src/todo-item//todo-item.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TodoItemRepo } from 'src/todo-item/todo-item.repo';

@Module({
  providers: [TodoItemResolvers, TodoItemService, TodoItemRepo],
  imports: [PrismaModule],
})
export class TodoItemModule {}
