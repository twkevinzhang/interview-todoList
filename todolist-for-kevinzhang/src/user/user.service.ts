import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private repo: UserRepo) {}

  async findByUID(uid: string): Promise<User> {
    return await this.repo.findByUID(uid);
  }
}
