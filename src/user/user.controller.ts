import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') userId: string): Promise<string | User> {
    const result = this.userService.getUser(parseInt(userId));
    return result;
  }

  @Get('/:email')
  async searchUser(@Query('query') query: string): Promise<User[] | string> {
    return this.userService.searchUser(query);
  }

  @Post('add')
  async addUser(@Body() userData: User): Promise<string | User> {
    return this.userService.addUser(userData);
  }

  @Put('update')
  updateUser(@Body() userData: User): string {
    return this.userService.updateUser(userData);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') userId: string): Promise<string> {
    const result = this.userService.deleteUser(parseInt(userId));
    return result;
  }
}
