import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(userId: string): Promise<string | User> {
    // userId should be string to match ObjectId type
    const user = await this.userModel.findById(userId).exec();
    return user || 'User not found';
  }

  async searchUser(query: string): Promise<User[] | string> {
    const searchResults = await this.userModel
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
    return searchResults.length ? searchResults : 'User not found';
  }

  async addUser(newUser: User): Promise<string | User> {
    const emailExists = await this.userModel
      .findOne({ email: newUser.email })
      .exec();
    if (emailExists) {
      return 'Email already exists';
    }
    const addedUser = await this.userModel.create(newUser);
    return addedUser;
  }

  async updateUser(updatedUser: User): Promise<string> {
    const result = await this.userModel
      .findByIdAndUpdate(updatedUser.id, updatedUser, { new: true }) //logicmiss in this line//
      .exec();
    return result ? 'User updated successfully!' : 'User not found!';
  }

  async deleteUser(userId: string): Promise<string> {
    const result = await this.userModel.findByIdAndDelete(userId).exec();
    return result ? 'User deleted successfully!' : 'User not found!';
  }
}
