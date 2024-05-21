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
  async getUsers(@Query('query') query: string): Promise<User[]> {
    const users = await this.userService.getUsers(query);
    return users;
  }

  @Get('/:id')
  async getUser(@Param('id') userId: string): Promise<string | User> {
    const result = await this.userService.getUser(userId);
    return result;
  }

  @Post('add')
  async addUser(@Body() userData: User): Promise<string | User> {
    return await this.userService.addUser(userData);
  }

  @Put('update')
  async updateUser(@Body() userData: User): Promise<string | User> {
    const updatedUser = await this.userService.updateUser(userData);
    return updatedUser;
  }

  @Delete('delete/:_id')
  async deleteUser(@Param('_id') userId: string): Promise<string> {
    return await this.userService.deleteUser(userId);
  }
}
