import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TodoItemService } from './todo-item.service';
import { TodoItem, TodoItemForm } from 'src/graphql.schema';

@Resolver('TodoItem')
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
  ): Promise<TodoItem> {
    return this.todoItemService.create('system', form, parentID);
  }

  @Mutation('updateTodoItem')
  async update(
    @Args('id') id: string,
    @Args('form') form: TodoItemForm,
  ): Promise<boolean> {
    return this.todoItemService.update('system', id, form);
  }

  @Mutation('deleteTodoItem')
  async delete(@Args('id') args: string): Promise<boolean> {
    return this.todoItemService.delete('system', args);
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
