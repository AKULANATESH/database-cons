// src/user/user.repository.ts

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  [x: string]: any;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
