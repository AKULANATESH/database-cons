import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { createAccountDto, signInAccountDto } from './account.dto';
import { Account } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async signIn(account: signInAccountDto): Promise<Account> {
    return await this.accountRepository.signIn(account);
  }

  async createAccount(account: createAccountDto): Promise<Account> {
    return await this.accountRepository.createAccount(account);
  }
}
