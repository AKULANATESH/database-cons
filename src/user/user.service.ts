import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';
import { DataExistsException } from './user-not-found.exception.filter';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  constructor(private userRepository: UserRepository) {}

  async getUsers(query: string): Promise<User[]> {
    if (query) {
      const searchResults = await this.userRepository.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      });
      return searchResults;
    }
    return await this.userRepository.find();
  }

  async getUser(userId: string): Promise<string | User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User with ID ${user_id} not found');
    }
    return user;
  }

  async addUser(newUser: User): Promise<string | User> {
    const emailExists = await this.userRepository.findOne({
      email: newUser.email,
    });
    if (emailExists) {
      throw new DataExistsException('Product with this email already exists');
    }
    const addedUser = await this.userRepository.create(newUser);
    return addedUser;
  }

  async updateUser(updatedUser: User): Promise<string> {
    const result = await this.userRepository.findByIdAndUpdate(
      updatedUser._id,
      updatedUser,
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('User with ID ${user_id} not found');
    }
    return 'User updated successfully!';
  }

  async deleteUser(userId: string): Promise<string> {
    const result = await this.userRepository.findByIdAndDelete(userId);
    if (!result) {
      throw new NotFoundException('User with id not found');
    }
    return 'User deleted successfully!';
  }
}

// // src/user/user.service.ts

// import {
//   Injectable,
//   NotFoundException,
//   BadRequestException,
// } from '@nestjs/common';
// import { UserRepository } from './user.repository';
// import { User } from './user.schema';
// import { isValidObjectId } from 'mongoose';

// @Injectable()
// export class UserService {
//   constructor(private userRepository: UserRepository) {}

//   async getUsers(): Promise<User[]> {
//     const users = await this.userRepository.findAll();
//     if (!users) {
//       throw new NotFoundException('No users found');
//     }
//     return users;
//   }

//   async getUser(userId: string): Promise<string | User> {
//     const user = await this.userRepository.findById(userId);
//     if (!user) {
//       throw new NotFoundException('User with ID ${user_id} not found');
//     }
//     return user;
//   }

//   async addUser(newUser: User): Promise<User> {
//     const emailExists = await this.userRepository.findByEmail(newUser.email);
//     if (emailExists) {
//       throw new BadRequestException('Email already exists');
//     }
//     return this.userRepository.create(newUser);
//   }

//   async updateUser(updatedUser: User): Promise<User> {
//     if (!isValidObjectId(updatedUser._id)) {
//       throw new BadRequestException(`Invalid ID format: ${updatedUser._id}`);
//     }
//     const result = await this.userRepository.update(
//       updatedUser.id,
//       updatedUser,
//     );
//     if (!result) {
//       throw new NotFoundException(`User with ID ${updatedUser._id} not found`);
//     }
//     return result;
//   }

//   async deleteUser(userId: string): Promise<string> {
//     if (!isValidObjectId(userId)) {
//       throw new BadRequestException(`Invalid ID format: ${userId}`);
//     }
//     const result = await this.userRepository.delete(userId);
//     if (!result) {
//       throw new NotFoundException(`User with ID ${userId} not found`);
//     }
//     return 'User deleted successfully!';
//   }
// }
