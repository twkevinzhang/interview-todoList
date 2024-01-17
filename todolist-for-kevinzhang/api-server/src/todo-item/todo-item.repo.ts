import { Injectable } from '@nestjs/common';
import { Comment, Prisma, TodoItem, User } from '@prisma/client';
import { TodoItemsFilters, TodoItemsSortBy } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoItemRepo {
  constructor(private prisma: PrismaService) {}

  async findByID(id: string): Promise<TodoItem | null> {
    return await this.prisma.todoItem.findFirst({
      where: {
        id,
      },
    });
  }

  async listByParent(parentID: string): Promise<TodoItem[]> {
    return await this.prisma.todoItem.findMany({
      where: {
        parentID,
      },
    });
  }

  async todoItems(
    filter: TodoItemsFilters | null,
    sortBy: TodoItemsSortBy | null,
  ): Promise<TodoItem[]> {
    let whereAnd: Prisma.TodoItemWhereInput[] = [];
    if (filter) {
      whereAnd = [
        {
          taskListID: filter.taskListID,
        },
        {
          createdByUID: filter.creatorUID
            ? {
                in: filter.creatorUID.contains,
                notIn: filter.creatorUID.notContains,
              }
            : {},
        },
        {
          owners: filter.ownerUID
            ? {
                some: filter.ownerUID.contains
                  ? {
                      uid: {
                        in: filter.ownerUID.contains,
                      },
                    }
                  : {},
                every: filter.ownerUID.notContains
                  ? {
                      uid: {
                        notIn: filter.ownerUID.notContains,
                      },
                    }
                  : {},
              }
            : {},
        },
        {
          followers: filter.followerUID
            ? {
                some: filter.followerUID.contains
                  ? {
                      uid: {
                        in: filter.followerUID.contains,
                      },
                    }
                  : {},
                every: filter.followerUID.notContains
                  ? {
                      uid: {
                        notIn: filter.followerUID.notContains,
                      },
                    }
                  : {},
              }
            : {},
        },
        {
          start: filter.duration?.start
            ? {
                gte: filter.duration.start,
              }
            : {},
        },
        {
          due: filter.duration?.due
            ? {
                lt: filter.duration.due,
              }
            : {},
        },
        {
          isCompleted: filter.isCompleted,
        },
      ];
    }
    let orderBy: Prisma.TodoItemOrderByWithRelationInput = {};
    switch (sortBy) {
      case TodoItemsSortBy.CREATED_AT_ASC:
        orderBy = {
          createdAt: 'asc',
        };
        break;
      case TodoItemsSortBy.CREATED_AT_DESC:
        orderBy = {
          createdAt: 'desc',
        };
        break;
      case TodoItemsSortBy.DUE_ASC:
        orderBy = {
          due: 'asc',
        };
        break;
      case TodoItemsSortBy.DUE_DESC:
        orderBy = {
          due: 'desc',
        };
        break;
      case TodoItemsSortBy.CREATED_BY_ASC:
        orderBy = {
          createdByUID: 'asc',
        };
        break;
      case TodoItemsSortBy.CREATED_BY_DESC:
        orderBy = {
          createdByUID: 'desc',
        };
        break;
    }
    return await this.prisma.todoItem.findMany({
      where: { AND: whereAnd },
      orderBy,
    });
  }

  async create(form: Prisma.TodoItemCreateInput): Promise<TodoItem> {
    return await this.prisma.todoItem.create({
      data: form,
    });
  }

  async update(id: string, form: Prisma.TodoItemUpdateInput): Promise<boolean> {
    await this.prisma.todoItem.update({
      where: {
        id,
      },
      data: form,
    });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.todoItem.delete({
      where: {
        id,
      },
    });
    return true;
  }

  async listOwners(id: string): Promise<User[]> {
    return await this.prisma.todoItem
      .findFirst({
        where: {
          id,
        },
      })
      .owners();
  }

  async listFollowers(id: string): Promise<User[]> {
    return await this.prisma.todoItem
      .findFirst({
        where: {
          id,
        },
      })
      .followers();
  }

  async listComments(id: string): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: {
        todoItemID: id,
      },
    });
  }
}
