import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';
import { UserService } from 'src/user/user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(User)
@UseGuards(JwtAuthGuard)
export class UserResolvers {
  constructor(private userService: UserService) {}

  @Query()
  async user(@Args('uid') uid: string): Promise<User> {
    return await this.userService.user(uid);
  }
}
