import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(): string {
    return 'User';
  }
  
  addUser(): string{
    return "added user ";
  }

  updateUser(): string{
    return "update user ";
  }

  deleteUser(): string{
    return "delete user ";
  }
}
