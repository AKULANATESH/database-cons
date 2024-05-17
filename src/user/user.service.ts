import { Injectable } from '@nestjs/common';
import { User } from './user.types';

  @Injectable()
  export class UserService {
  usersList: User[] = [];

  getUser(): any{
    // return only individual user
    return this.usersList;
  }

  addUser(newUser: User): User {
    // validation user email already exists
    this.usersList.push(newUser)
    return newUser;
  }

  updateUser(updatedUser: User): string{
    const userIdx = this.usersList.findIndex(user => user.id === updatedUser.id);
    if (userIdx !== -1){
      this.usersList[userIdx] = { ...this.usersList[userIdx], ...updatedUser };
      return "User updated successfully!";
    } else {
      return "User not found!";
    }
  }

  deleteUser(userId: number): string {
    const userIndex = this.usersList.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      this.usersList.splice(userIndex, 1);
      return "User deleted successfully!";
    } else {
      return "User not found!";
    }
  }
}
