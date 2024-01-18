import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { User } from 'src/graphql.schema';

@Injectable()
export class UserService {
  constructor(private repo: UserRepo) {}

  async user(uid: string): Promise<User> {
    const user = await this.repo.findByUID(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async users(): Promise<User[]> {
    return await this.repo.findAll();
  }
}
