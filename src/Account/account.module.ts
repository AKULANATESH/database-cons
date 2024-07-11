import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';

// import { Order, OrderSchema } from './order.schema';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountService } from './account.service';
import { AuthModule } from 'src/Auth/auth.module';
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
