import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { signInAccountDto } from 'src/Account/account.dto';
import { AccountService } from 'src/Account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(account: signInAccountDto): Promise<{ access_token: string }> {
    const user = await this.accountService.signIn(account);
    if (!user) {
      throw new UnauthorizedException(); // Handle unauthorized access
    } else {
      const payload = { username: user.userName, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
