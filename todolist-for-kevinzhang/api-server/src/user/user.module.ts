import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserResolvers } from 'src/user/user.resolvers';
import { UserRepo } from 'src/user/user.repo';

@Module({
  providers: [UserService, UserResolvers, UserRepo],
  imports: [PrismaModule],
  exports: [UserRepo, UserService],
})
export class UserModule {}
