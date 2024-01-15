import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TodoItemService } from 'src/todo-item/todo-item.service';
import { TodoItem, TodoItemForm } from 'src/graphql.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from '@prisma/client';

@Resolver('TodoItem')
@UseGuards(JwtAuthGuard)
export class TodoItemResolvers {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Query('todoItem')
  async todoItem(@Args('id') id: string): Promise<TodoItem> {
    return this.todoItemService.findByID(id);
  }

  @Mutation('createTodoItem')
  async create(
    @Args('parentID') parentID: string,
    @Args('form') form: TodoItemForm,
    @CurrentUser() by: User,
  ): Promise<TodoItem> {
    return this.todoItemService.create(by.uid, form, parentID);
  }

  @Mutation('updateTodoItem')
  async update(
    @Args('id') id: string,
    @Args('form') form: TodoItemForm,
    @CurrentUser() by: User,
  ): Promise<boolean> {
    return this.todoItemService.update(by.uid, id, form);
  }

  @Mutation('deleteTodoItem')
  async delete(
    @Args('id') args: string,
    @CurrentUser() by: User,
  ): Promise<boolean> {
    return this.todoItemService.delete(by.uid, args);
  }

  @ResolveField('parent')
  async parent(@Parent() todoItem: TodoItem): Promise<TodoItem> {
    return this.todoItemService.findByID(todoItem.parentID!);
  }

  @ResolveField('children')
  async children(@Parent() todoItem: TodoItem): Promise<TodoItem[]> {
    return this.todoItemService.listByParent(todoItem.id);
  }
}
