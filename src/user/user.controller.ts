import { Controller, Get, Post , Put, Delete, Body, Param} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.types';

@Controller("user")
export class UserController{
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): string {
    return this.userService.getUser();
  }

  @Post("add")
  async addUser(@Body() userData: User): Promise<User> {
    const result = this.userService.addUser(userData);
    return result;
  };
  
  @Put("update")
  updateUser(@Body() userData: User):string{
    return this.userService.updateUser(userData);
  }

  @Delete("delete/:id")
  async deleteUser( @Param('id') userId: number):Promise<string> {
    const result = this.userService.deleteUser(userId);
    return result;
  }
} 
