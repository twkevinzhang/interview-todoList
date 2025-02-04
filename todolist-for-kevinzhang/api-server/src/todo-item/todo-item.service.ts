import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  TodoItemForm,
  TodoItem,
  TodoItemsFilters,
  TodoItemsSortBy,
  Attachment,
  Comment,
  User,
  FileInput,
} from 'src/graphql.schema';
import { TodoItemRepo } from 'src/todo-item/todo-item.repo';
import * as dayjs from 'dayjs';
import { createWriteStream } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TodoItemService {
  constructor(
    private todoItemRepo: TodoItemRepo,
    private configService: ConfigService,
  ) {}

  async todoItem(id: string): Promise<TodoItem> {
    const result = await this.todoItemRepo.findByID(id);
    if (!result) {
      throw new NotFoundException();
    }
    return this.toOutput(result);
  }

  async todoItems(
    filter?: TodoItemsFilters,
    sortBy?: TodoItemsSortBy,
  ): Promise<TodoItem[]> {
    const result = await this.todoItemRepo.todoItems(
      filter || null,
      sortBy || null,
    );
    return result.map(this.toOutput);
  }

  async create(
    by: string,
    form: TodoItemForm,
    parentID?: string,
  ): Promise<TodoItem> {
    const orm = this.toCreateInput(form, by, parentID);
    orm.attachments = {
      create: form.newAttachments
        ? await this.attachmentToCreateInput(form.newAttachments, by)
        : [],
    };
    const result = await this.todoItemRepo.create(orm);
    return this.toOutput(result);
  }

  async update(by: string, id: string, form: TodoItemForm): Promise<boolean> {
    const orm = this.toUpdateInput(form, by);
    orm.attachments = {
      create: form.newAttachments
        ? await this.attachmentToCreateInput(form.newAttachments, by)
        : [],
    };
    await this.todoItemRepo.update(id, orm);
    return true;
  }

  async delete(by: string, id: string): Promise<boolean> {
    await this.todoItemRepo.delete(id);
    return true;
  }

  async owners(id: string): Promise<User[]> {
    const result = await this.todoItemRepo.listOwners(id);
    return result.map(this.userToOutput);
  }

  async followers(id: string): Promise<User[]> {
    const result = await this.todoItemRepo.listFollowers(id);
    return result.map(this.userToOutput);
  }

  async children(parentID: string): Promise<TodoItem[]> {
    const result = await this.todoItemRepo.listByParent(parentID);
    return result.map(this.toOutput);
  }

  async attachments(id: string): Promise<Attachment[]> {
    const result = await this.todoItemRepo.attachments(id);
    return result.map((a) => ({
      ...new Attachment(),
      id: a.id,
      todoItemID: a.todoItemID,
      name: a.name,
      url: a.url,
      createdAt: a.createdAt,
      createdByUID: a.createdByUID,
    }));
  }

  async comments(id: string): Promise<Comment[]> {
    const result = await this.todoItemRepo.listComments(id);
    return result.map((c) => ({
      ...new Comment(),
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      createdByUID: c.createdByUID,
    }));
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
      createdByUID: from.createdByUID,
      updatedAt: from.updatedAt,
      updatedByUID: from.updatedByUID,
    };
  }

  userToOutput(from: {
    uid: string;
    username: string;
    email: string;
    nickname: string;
    hashedPassword: string;
  }): User {
    return {
      ...new User(),
      uid: from.uid,
      username: from.username,
      email: from.email,
    };
  }

  toCreateInput(
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
    if (from.duration) {
      if (from.duration.start) {
        to.start = from.duration.start;
      }
      if (from.duration.due) {
        to.due = from.duration.due;
      }
    }
    if (from.description) {
      to.description = from.description;
    }
    if (from.newComments) {
      to.comments = {
        create: from.newComments.map((content) => ({
          content: content,
          createdAt: new Date(Date.now()),
          createdBy: {
            connect: {
              uid: byUID,
            },
          },
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

  toUpdateInput(from: TodoItemForm, byUID: string): Prisma.TodoItemUpdateInput {
    const to = {} as Prisma.TodoItemUpdateInput;
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
        set:
          from.putOwnersUIDs.map((id: string) => ({ uid: id.toString() })) ||
          [],
      };
    }
    if (from.putFollowersUIDs) {
      to.followers = {
        set:
          from.putFollowersUIDs.map((id: string) => ({
            uid: id.toString(),
          })) || [],
      };
    }
    if (from.duration) {
      if (from.duration.start) {
        to.start = from.duration.start;
      }
      if (from.duration.due) {
        to.due = from.duration.due;
      }
    }
    if (from.description) {
      to.description = from.description;
    }
    if (from.newComments) {
      to.comments = {
        create: from.newComments.map((content) => ({
          content: content,
          createdAt: new Date(Date.now()),
          createdBy: {
            connect: {
              uid: byUID,
            },
          },
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

  async attachmentToCreateInput(
    forms: FileInput[],
    byUID: string,
  ): Promise<Prisma.AttachmentCreateWithoutTodoItemInput[]> {
    return await Promise.all(
      forms.map((a) =>
        a.content.then((file) => {
          const { filename, createReadStream, mimetype } = file;
          const newFilename = `${filename}_${dayjs().valueOf()}.${
            mimetype.split('/')[1]
          }`;
          return new Promise<Prisma.AttachmentCreateWithoutTodoItemInput>(
            async (resolve, reject) =>
              createReadStream().pipe(
                createWriteStream(`./attachments/${newFilename}`)
                  .on('error', (err) => {
                    console.error('Error upload ', err);
                    reject(err);
                  })
                  .on('finish', async () => {
                    const link = `${this.configService.get(
                      'DOMAIN',
                    )}/attachments/${newFilename}`;
                    const newAttachment: Prisma.AttachmentCreateWithoutTodoItemInput =
                      {
                        name: newFilename,
                        url: link,
                        createdAt: new Date(Date.now()),
                        createdBy: {
                          connect: {
                            uid: byUID,
                          },
                        },
                      };
                    resolve(newAttachment);
                  }),
              ),
          );
        }),
      ),
    );
  }
}
