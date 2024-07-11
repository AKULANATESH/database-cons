import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { signInAccountDto } from 'src/Account/account.dto';
import { AuthService } from './auth.service';
import { Public } from './auth.meta';

@Controller('auth')
@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(
    @Body() account: signInAccountDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(account);
  }
}
