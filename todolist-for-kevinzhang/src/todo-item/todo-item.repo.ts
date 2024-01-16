import { Injectable } from '@nestjs/common';
import { Prisma, TodoItem } from '@prisma/client';
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

  async listByCreator(creatorUID: string): Promise<TodoItem[]> {
    return await this.prisma.todoItem.findMany({
      where: {
        createdByUID: creatorUID,
      },
    });
  }

  async listByOwner(ownerUID: string): Promise<TodoItem[]> {
    return await this.prisma.todoItem.findMany({
      where: {
        owners: {
          some: {
            uid: ownerUID,
          },
        },
      },
    });
  }

  async listByFollower(followerUID: string): Promise<TodoItem[]> {
    return await this.prisma.todoItem.findMany({
      where: {
        followers: {
          some: {
            uid: followerUID,
          },
        },
      },
    });
  }

  async list(): Promise<TodoItem[]> {
    return await this.prisma.todoItem.findMany({});
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
}
