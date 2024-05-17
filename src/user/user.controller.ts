import { Controller, Get, Post ,Put,Delete,Body,Param} from '@nestjs/common';

import { UserService } from './user.service';

@Controller("user")
export class UserController{
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): string {
    return this.userService.getUser();
  }

  @Post("add")
  async addUser(@Body() userData: any): Promise<string> {
    const result = await this.userService.addUser(userData);
    return result;
  };
  
  @Put("update")
  updateUser():string{
    return this.userService.updateuser();
  }

  @Delete("delete/:id")
  async deleteUser( @Param('id') userId: number):Promise<string> {
    const result = await this.userService.deleteUser(userId);
    return result;
  }
} 
