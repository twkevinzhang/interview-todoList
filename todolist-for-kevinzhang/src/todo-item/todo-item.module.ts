import { Module } from '@nestjs/common';
import { TodoItemResolvers } from 'src/todo-item/todo-item.resolvers';
import { TodoItemService } from 'src/todo-item//todo-item.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TodoItemResolvers, TodoItemService],
  imports: [PrismaModule],
})
export class TodoItemModule {}
