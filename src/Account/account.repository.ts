import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createAccountDto, signInAccountDto } from './account.dto';
import { Account } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(account: signInAccountDto): Promise<Account> {
    const { userName, password } = account;
    const user = await this.prisma.account.findFirst({
      where: { userName, password },
    });

    if (!user || user.password !== password) {
      throw new BadRequestException('Invalid username or password');
    } else {
      return user;
    }
  }

  async createAccount(account: createAccountDto): Promise<Account> {
    const newAccount = await this.prisma.account.create({
      data: account,
    });
    return newAccount;
  }
}
