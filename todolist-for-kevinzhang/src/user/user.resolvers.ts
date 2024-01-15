import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';
import { UserService } from 'src/user/user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UserResolvers {
  constructor(private userService: UserService) {}

  @Query('user')
  async user(@Args('uid') uid: string): Promise<User> {
    const result = await this.userService.findByUID(uid);
    return {
      uid: result.uid,
      email: result.email,
      username: result.username,
    };
  }
}
