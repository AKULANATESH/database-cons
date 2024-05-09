import { Controller, Get, Post ,Put,Delete} from '@nestjs/common';

import { UserService } from './user.service';

@Controller("user")
export class UserController{
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): string {
    return this.userService.getUser();
  }
  @Post("add")
  addUser():string{
    return this.userService.addUser();
  }
  @Put("update")
  updateUser():string{
    return this.userService.updateUser();
  }
  @Delete("delete")
  deleteUser():string{
    return this.userService.updateUser();
  }

  
}

