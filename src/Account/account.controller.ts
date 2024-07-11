import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from '@prisma/client';
import { createAccountDto } from './account.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorators';
import { Role } from 'src/authorization/roles.enum';

@Controller('account')
export class AccountController {
  constructor(private readonly acountService: AccountService) {}

  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('add')
  async createAccount(@Body() account: createAccountDto): Promise<Account> {
    return await this.acountService.createAccount(account);
  }
}
