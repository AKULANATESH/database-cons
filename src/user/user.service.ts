import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(query: string): Promise<User[]> {
    if (query) {
      const searchResults = await this.userModel.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      });
      return searchResults;
    }
    return await this.userModel.find();
  }

  async getUser(userId: string): Promise<string | User> {
    const user = await this.userModel.findById(userId);
    return user || 'User not found';
  }

  async addUser(newUser: User): Promise<string | User> {
    const emailExists = await this.userModel.findOne({ email: newUser.email });
    if (emailExists) {
      return 'Email already exists';
    }
    const addedUser = await this.userModel.create(newUser);
    return addedUser;
  }

  async updateUser(updatedUser: User): Promise<string> {
    const result = await this.userModel.findByIdAndUpdate(
      updatedUser._id,
      updatedUser,
      { new: true },
    );
    return result ? 'User updated successfully!' : 'User not found!';
  }

  async deleteUser(userId: string): Promise<string> {
    const result = await this.userModel.findByIdAndDelete(userId);
    return result ? 'User deleted successfully!' : 'User not found!';
  }
}
