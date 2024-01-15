import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findByUsername(username: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });
    return user;
  }

  async findByUID(uid: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { uid },
    });
    return user;
  }

  async create(input: { username: string; hashedPassword: string }): Promise<{
    username: string;
    hashedPassword: string;
  }> {
    const user = await this.prismaService.user.create({
      data: {
        username: input.username,
        hashedPassword: input.hashedPassword,
      },
    });
    return user;
  }
}
