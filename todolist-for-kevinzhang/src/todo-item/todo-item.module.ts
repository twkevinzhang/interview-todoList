import { Module } from '@nestjs/common';
import { TodoItemResolvers } from './todo-item.resolvers';
import { TodoItemService } from './todo-item.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [TodoItemResolvers, TodoItemService],
  imports: [PrismaModule],
})
export class TodoItemModule {}
