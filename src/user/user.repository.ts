import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { AddUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: AddUserDto): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async find(user: AddUserDto): Promise<User[]> {
    return await this.userModel.find({ user });
  }

  async findById(_id: string): Promise<User> {
    return await this.userModel.findById({ _id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, user: Partial<Omit<User, '_id'>>): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<string> {
    await this.userModel.findByIdAndDelete(id);
    return `User with ID ${id} deleted`;
  }
}
