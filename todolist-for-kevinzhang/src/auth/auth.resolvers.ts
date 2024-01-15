import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { Auth, UserForm, User } from 'src/graphql.schema';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private authService: AuthService) {}

  @Mutation('signUp')
  async signUp(@Args('form') form: UserForm): Promise<User> {
    return this.authService.signUp(form);
  }

  @Mutation('signIn')
  @UseGuards(GqlAuthGuard)
  async signIn(@Context('user') user: { username: string }): Promise<Auth> {
    return this.authService.signIn(user);
  }
}
