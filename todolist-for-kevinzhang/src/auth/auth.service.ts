import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth, UserForm, User } from 'src/graphql.schema';
import * as bcrypt from 'bcrypt';
import { UserRepo } from 'src/user/user.repo';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

  async signUp(form: UserForm): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(form.password, salt);
    const result = await this.userRepo.create({
      username: form.username,
      hashedPassword,
    });
    return this.toOutput(result);
  }

  async signIn(user: { username: string }): Promise<Auth> {
    const accessToken = this.jwtService.sign({
      username: user.username,
    });
    if (!accessToken) {
      throw new InternalServerErrorException();
    }
    return {
      accessToken,
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      throw new UnauthorizedException();
    }
    return this.toOutput(user);
  }

  toOutput(from: { username: string; hashedPassword: string }): User {
    return {
      ...new User(),
      username: from.username,
    };
  }
}
