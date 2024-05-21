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
  async getUsers(): Promise<User[]> {
    const ab = await this.userService.getUsers();
    return ab;
  }

  @Get('/:id')
  async getUser(@Param('id') userId: string): Promise<string | User> {
    const result = this.userService.getUser(userId);
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
  async updateUser(@Body() userData: User): Promise<string | User> {
    const updatedusers = await this.userService.updateUser(userData);
    return updatedusers;
  }

  @Delete('delete/:_id')
  async deleteUser(@Param('_id') userId: string): Promise<string> {
    return this.userService.deleteUser(userId);
  }
}
