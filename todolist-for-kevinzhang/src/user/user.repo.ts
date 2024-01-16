import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepo {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { username },
    });
    return user;
  }

  async findByUID(uid: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { uid },
    });
    return user;
  }

  async create(input: Prisma.UserCreateInput): Promise<{
    username: string;
    hashedPassword: string;
  }> {
    const user = await this.prisma.user.create({
      data: {
        username: input.username,
        hashedPassword: input.hashedPassword,
      },
    });
    return user;
  }
}
