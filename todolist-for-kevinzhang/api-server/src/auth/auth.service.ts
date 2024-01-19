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

  async signIn(user: { username: string; sub: string }): Promise<Auth> {
    const accessToken = this.jwtService.sign({
      username: user.username,
      sub: user.sub,
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
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!(await bcrypt.compare(password, user.hashedPassword))) {
      throw new UnauthorizedException('Wrong password');
    }
    return user;
  }

  toOutput(from: any): User {
    delete from.hashedPassword;
    return {
      ...new User(),
      ...from,
    };
  }
}
