import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { AddUserDto, CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(query: AddUserDto): Promise<User[]> {
    if (query?.$or) {
      // Check if $or property exists
      const searchResults = await this.userRepository.find({
        $or: query.$or,
        name: '',
        email: '',
        age: 0,
      });
      return searchResults;
    }
    // Handle case where $or is not provided
    return await this.userRepository.find(query); // Original query logic
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User with ID ${user_id} not found');
    }
    return user;
  }

  async addUser(newUser: AddUserDto): Promise<User | string> {
    const emailExists = await this.userRepository.findByEmail(newUser.email);
    if (emailExists) {
      throw new ConflictException('Product with this email already exists');
    }
    const addedUser = await this.userRepository.create(newUser);
    return addedUser;
  }

  async createUser(createUser: CreateUserDto): Promise<string | User> {
    const emailExists = await this.userRepository.findByEmail(createUser.email);
    if (emailExists) {
      throw new ConflictException('Product with this email already exists');
    }
    const createUserResponse = await this.userRepository.create(createUser);
    return createUserResponse;
  }

  async updateUser(updatedUser: UpdateUserDto, userId: string): Promise<User> {
    const result = await this.userRepository.update(userId, updatedUser);
    if (!result) {
      throw new NotFoundException('User with ID ${user_id} not found');
    }
    return result;
  }

  async deleteUser(userId: string): Promise<string> {
    const result = await this.userRepository.delete(userId);
    if (!result) {
      throw new NotFoundException('User with id not found');
    }
    return 'User deleted successfully!';
  }
}
