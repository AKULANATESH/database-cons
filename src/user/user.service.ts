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

  async getUsers(query: string): Promise<User[]> {
    if (query) {
      const searchResults = await this.userRepository.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
        name: '',
        email: '',
        age: 0,
      });
      return searchResults;
    }
    return await this.userRepository.find({
      User,
      name: '',
      email: '',
      age: 0,
    });
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
