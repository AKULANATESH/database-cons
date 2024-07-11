import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Product, ProductSchema } from './product.schema';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountService } from 'src/Account/account.service';
import { AccountRepository } from 'src/Account/account.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountService,
    AccountRepository,
    AuthGuard,
    RolesGuard,
  ],
  exports: [AuthService, JwtModule, AuthGuard],
})
export class AuthModule {}
