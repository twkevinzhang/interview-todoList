import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserResolvers } from 'src/user/user.resolvers';

@Module({
  providers: [UserService, UserResolvers],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
