import { Module } from '@nestjs/common';
import { TodoItemResolvers } from './todo-item.resolvers';
import { TodoItemService } from './todo-item.service';

@Module({
  providers: [TodoItemResolvers, TodoItemService],
  imports: [],
})
export class TodoItemModule {}
