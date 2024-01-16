import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TodoItemService } from 'src/todo-item/todo-item.service';
import {
  TodoItem,
  TodoItemForm,
  TodoItemsFilters,
  TodoItemsSortBy,
  User as UserRes,
} from 'src/graphql.schema';
import { NotImplementedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Resolver('TodoItem')
@UseGuards(JwtAuthGuard)
export class TodoItemResolvers {
  constructor(
    private readonly todoItemService: TodoItemService,
    private readonly userService: UserService,
  ) {}

  @Query('todoItem')
  async todoItem(@Args('id') id: string): Promise<TodoItem> {
    return this.todoItemService.todoItem(id);
  }

  @Query('todoItems')
  async todoItems(
    @Args('filter') filter: TodoItemsFilters,
    @Args('sortBy') sortBy: TodoItemsSortBy,
  ): Promise<TodoItem[]> {
    return this.todoItemService.todoItems(filter, sortBy);
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

  @ResolveField('taskList')
  async taskList(@Parent() todoItem: TodoItem): Promise<UserRes> {
    throw new NotImplementedException();
  }

  @ResolveField('owners')
  async owners(@Parent() todoItem: TodoItem): Promise<UserRes> {
    throw new NotImplementedException();
  }

  @ResolveField('followers')
  async followers(@Parent() todoItem: TodoItem): Promise<UserRes> {
    throw new NotImplementedException();
  }

  @ResolveField('parent')
  async parent(@Parent() todoItem: TodoItem): Promise<TodoItem> {
    return this.todoItemService.todoItem(todoItem.parentID!);
  }

  @ResolveField('children')
  async children(@Parent() todoItem: TodoItem): Promise<TodoItem[]> {
    return this.todoItemService.children(todoItem.id);
  }

  @ResolveField('attachments')
  async attachments(@Parent() todoItem: TodoItem): Promise<UserRes> {
    throw new NotImplementedException();
  }

  @ResolveField('comments')
  async comments(@Parent() todoItem: TodoItem): Promise<UserRes> {
    throw new NotImplementedException();
  }

  @ResolveField('createdBy')
  async createdBy(@Parent() todoItem: TodoItem): Promise<UserRes> {
    return this.userService.user(todoItem.createdByUID);
  }

  @ResolveField('updatedBy')
  async updatedBy(@Parent() todoItem: TodoItem): Promise<UserRes> {
    return this.userService.user(todoItem.updatedByUID);
  }
}
