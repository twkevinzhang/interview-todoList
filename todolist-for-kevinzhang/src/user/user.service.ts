import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { User } from 'src/graphql.schema';

@Injectable()
export class UserService {
  constructor(private repo: UserRepo) {}

  async user(uid: string): Promise<User> {
    return await this.repo.findByUID(uid);
  }
}
