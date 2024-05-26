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
import { AddUserDto, CreateUserDto, UpdateUserDto } from './user.dto';

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

  @Post()
  async addUser(@Body() userData: AddUserDto): Promise<string | User> {
    return await this.userService.addUser(userData);
  }

  @Post('add')
  async createUser(@Body() createUser: CreateUserDto): Promise<string | User> {
    return await this.userService.createUser(createUser);
  }

  @Put('/:id')
  async updateUser(
    @Body() userData: UpdateUserDto,
    @Param('id') userId: string,
  ): Promise<string | User> {
    const updatedUser = await this.userService.updateUser(userData, userId);
    return updatedUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<string> {
    return await this.userService.deleteUser(userId);
  }
}
