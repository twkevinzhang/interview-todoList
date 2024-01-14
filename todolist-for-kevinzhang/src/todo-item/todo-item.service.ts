import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TodoItemForm, TodoItem } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoItemService {
  constructor(private prisma: PrismaService) {}

  async findByID(id: string): Promise<TodoItem | null> {
    const result = await this.prisma.todoItem.findFirst({
      where: {
        id,
      },
    });
    return this.toOutput(result);
  }

  async listByParent(parentID: string): Promise<TodoItem[]> {
    const result = await this.prisma.todoItem.findMany({
      where: {
        parentID,
      },
    });
    return result.map(this.toOutput);
  }

  async list(): Promise<TodoItem[]> {
    const result = await this.prisma.todoItem.findMany({});
    return result.map(this.toOutput);
  }

  async create(
    by: string,
    form: TodoItemForm,
    parentID?: string,
  ): Promise<TodoItem> {
    const result = await this.prisma.todoItem.create({
      data: this.toInput(form, by, parentID),
    });
    return this.toOutput(result);
  }

  async update(by: string, id: string, form: TodoItemForm): Promise<boolean> {
    const result = await this.prisma.todoItem.update({
      where: {
        id,
      },
      data: this.toInput(form, by),
    });
    return true;
  }

  async delete(by: string, id: string): Promise<boolean> {
    const result = await this.prisma.todoItem.delete({
      where: {
        id,
      },
    });
    return true;
  }

  toOutput(from: {
    id: string;
    taskListID?: string;
    title?: string;
    start?: Date;
    due?: Date;
    description?: string;
    parentId?: string;
    isCompleted: boolean;
    createdAt: Date;
    createdByUID: string;
    updatedAt: Date;
    updatedByUID: string;
  }): TodoItem {
    return {
      ...new TodoItem(),
      id: from.id,
      taskListID: from.taskListID,
      title: from.title,
      start: from.start,
      due: from.due,
      description: from.description,
      parentID: from.parentId,
      isCompleted: from.isCompleted,
      createdAt: from.createdAt,
      updatedAt: from.updatedAt,
    };
  }

  toInput(
    from: TodoItemForm,
    byUID: string,
    parentID?: string,
  ): Prisma.TodoItemCreateInput {
    const to = {} as Prisma.TodoItemCreateInput;
    if (from.taskListID) {
      to.taskList = {
        connect: {
          id: from.taskListID,
        },
      };
    }
    if (from.title) {
      to.title = from.title;
    }
    if (from.putOwnersUIDs) {
      to.owners = {
        connect:
          from.putOwnersUIDs?.map((id: string) => ({ uid: id.toString() })) ||
          [],
      };
    }
    if (from.putFollowersUIDs) {
      to.followers = {
        connect:
          from.putFollowersUIDs?.map((id: string) => ({
            uid: id.toString(),
          })) || [],
      };
    }
    if (parentID) {
      to.parent = {
        connect: {
          id: parentID,
        },
      };
    }
    if (from.start) {
      to.start = from.start;
    }
    if (from.due) {
      to.due = from.due;
    }
    if (from.description) {
      to.description = from.description;
    }
    to.isCompleted = from.isCompleted || false;
    to.createdBy = {
      connect: {
        uid: byUID,
      },
    };
    to.createdAt = new Date(Date.now());
    to.updatedBy = {
      connect: {
        uid: byUID,
      },
    };
    to.updatedAt = new Date(Date.now());
    return to;
  }
}
