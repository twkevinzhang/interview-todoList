import { Injectable } from '@nestjs/common';
import { Prisma, TaskList } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskListRepo {
  constructor(private prisma: PrismaService) {}

  async findByID(id: string): Promise<TaskList | null> {
    return await this.prisma.taskList.findFirst({
      where: {
        id,
      },
    });
  }

  async create(form: Prisma.TaskListCreateInput): Promise<TaskList> {
    return await this.prisma.taskList.create({
      data: form,
    });
  }
}
