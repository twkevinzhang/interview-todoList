import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolvers } from './auth.resolvers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        signOptions: {
          expiresIn: '10h',
        },
        secret: 'JWT_SECRET',
      }),
    }),
  ],
  providers: [AuthService, AuthResolvers, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
