import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthResolvers } from 'src/auth/auth.resolvers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '10h',
        },
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [AuthService, AuthResolvers, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
