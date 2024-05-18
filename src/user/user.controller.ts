/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //  @Get()
  //  getUsers()
  @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }

  @Get('/:name')
  async getUser(@Param('name') userName: string): Promise<User | string> {
    return this.userService.getUser(userName);
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
