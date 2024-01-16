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
  Attachment,
  Comment,
  TodoItem,
  TodoItemForm,
  TodoItemsFilters,
  TodoItemsSortBy,
  User,
} from 'src/graphql.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { TaskList, User as By } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { TaskListService } from 'src/task-list/task-list.service';

@Resolver('TodoItem')
@UseGuards(JwtAuthGuard)
export class TodoItemResolvers {
  constructor(
    private readonly todoItemService: TodoItemService,
    private readonly userService: UserService,
    private readonly taskListService: TaskListService,
  ) {}

  @Query()
  async todoItem(@Args('id') id: string): Promise<TodoItem> {
    return this.todoItemService.todoItem(id);
  }

  @Query()
  async todoItems(
    @Args('filter') filter: TodoItemsFilters,
    @Args('sortBy') sortBy: TodoItemsSortBy,
  ): Promise<TodoItem[]> {
    return this.todoItemService.todoItems(filter, sortBy);
  }

  @Mutation()
  async createTodoItem(
    @Args('parentID') parentID: string,
    @Args('form') form: TodoItemForm,
    @CurrentUser() by: By,
  ): Promise<TodoItem> {
    return this.todoItemService.create(by.uid, form, parentID);
  }

  @Mutation()
  async updateTodoItem(
    @Args('id') id: string,
    @Args('form') form: TodoItemForm,
    @CurrentUser() by: By,
  ): Promise<boolean> {
    return this.todoItemService.update(by.uid, id, form);
  }

  @Mutation()
  async deleteTodoItem(
    @Args('id') args: string,
    @CurrentUser() by: By,
  ): Promise<boolean> {
    return this.todoItemService.delete(by.uid, args);
  }

  @ResolveField()
  async taskList(@Parent() todoItem: TodoItem): Promise<TaskList> {
    return this.taskListService.taskList(todoItem.id);
  }

  @ResolveField()
  async owners(@Parent() todoItem: TodoItem): Promise<User[]> {
    return this.todoItemService.owners(todoItem.id);
  }

  @ResolveField()
  async followers(@Parent() todoItem: TodoItem): Promise<User[]> {
    return this.todoItemService.followers(todoItem.id);
  }

  @ResolveField()
  async parent(@Parent() todoItem: TodoItem): Promise<TodoItem> {
    return this.todoItemService.todoItem(todoItem.parentID!);
  }

  @ResolveField()
  async children(@Parent() todoItem: TodoItem): Promise<TodoItem[]> {
    return this.todoItemService.children(todoItem.id);
  }

  @ResolveField()
  async attachments(@Parent() todoItem: TodoItem): Promise<Attachment[]> {
    return this.todoItemService.attachments(todoItem.id);
  }

  @ResolveField()
  async comments(@Parent() todoItem: TodoItem): Promise<Comment[]> {
    return this.todoItemService.comments(todoItem.id);
  }

  @ResolveField()
  async createdBy(@Parent() todoItem: TodoItem): Promise<User> {
    return this.userService.user(todoItem.createdByUID);
  }

  @ResolveField()
  async updatedBy(@Parent() todoItem: TodoItem): Promise<User> {
    return this.userService.user(todoItem.updatedByUID);
  }
}

@Resolver('Comment')
@UseGuards(JwtAuthGuard)
export class CommentResolvers {
  constructor(private readonly userService: UserService) {}

  @ResolveField()
  async createdBy(@Parent() comment: Comment): Promise<User> {
    return this.userService.user(comment.createdByUID);
  }
}

@Resolver('Attachment')
@UseGuards(JwtAuthGuard)
export class AttachmentResolvers {
  constructor(private readonly userService: UserService) {}

  @ResolveField()
  async createdBy(@Parent() attachment: Attachment): Promise<User> {
    return this.userService.user(attachment.createdByUID);
  }
}
