import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TodoItemForm, TodoItem } from 'src/graphql.schema';
import { TodoItemRepo } from 'src/todo-item/todo-item.repo';

@Injectable()
export class TodoItemService {
  constructor(private repo: TodoItemRepo) {}

  async todoItem(id: string): Promise<TodoItem | null> {
    const result = await this.repo.findByID(id);
    return this.toOutput(result);
  }

  async children(parentID: string): Promise<TodoItem[]> {
    const result = await this.repo.listByParent(parentID);
    return result.map(this.toOutput);
  }

  async myCreatedTodoItems(creatorUID: string): Promise<TodoItem[]> {
    const result = await this.repo.listByCreator(creatorUID);
    return result.map(this.toOutput);
  }

  async myOwnedTodoItems(ownerUID: string): Promise<TodoItem[]> {
    const result = await this.repo.listByOwner(ownerUID);
    return result.map(this.toOutput);
  }

  async myFollowedTodoItems(followerUID: string): Promise<TodoItem[]> {
    const result = await this.repo.listByFollower(followerUID);
    return result.map(this.toOutput);
  }

  async list(): Promise<TodoItem[]> {
    const result = await this.repo.list();
    return result.map(this.toOutput);
  }

  async create(
    by: string,
    form: TodoItemForm,
    parentID?: string,
  ): Promise<TodoItem> {
    const result = await this.repo.create(this.toInput(form, by, parentID));
    return this.toOutput(result);
  }

  async update(by: string, id: string, form: TodoItemForm): Promise<boolean> {
    await this.repo.update(id, this.toInput(form, by, null));
    return true;
  }

  async delete(by: string, id: string): Promise<boolean> {
    await this.repo.delete(id);
    return true;
  }

  toOutput(from: {
    id: string;
    taskListID?: string;
    title?: string;
    start?: Date;
    due?: Date;
    description?: string;
    parentID?: string;
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
      parentID: from.parentID,
      isCompleted: from.isCompleted,
      createdAt: from.createdAt,
      updatedAt: from.updatedAt,
    };
  }

  toInput(
    from: TodoItemForm,
    byUID: string,
    parentID: string | null,
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
          from.putOwnersUIDs.map((id: string) => ({ uid: id.toString() })) ||
          [],
      };
    }
    if (from.putFollowersUIDs) {
      to.followers = {
        connect:
          from.putFollowersUIDs.map((id: string) => ({
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
    if (from.newComments) {
      to.comments = {
        create: from.newComments.map((content) => ({
          content: content,
          createdAt: new Date(Date.now()),
        })),
      };
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
