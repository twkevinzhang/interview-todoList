import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET',
    });
  }

  // validate function return { userId: payload.sub, username: payload.username };
  async validate(payload: any) {
    const { username } = payload;
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
