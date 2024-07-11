import { createMock, type DeepMocked } from '@golevelup/ts-jest';
import { Test, type TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

import { UserController } from './user.controller';
import { UserService } from './user.service';

// Import your DTOs
import { AddUserDto, UpdateUserDto } from './user.dto';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: DeepMocked<UserService>;

  const mockUsers: User = {
    id: '1',
    name: 'John',
    email: 'john@example.com',
    age: 30,
  };

  beforeEach(async () => {
    mockUserService = createMock<UserService>();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      // Arrange
      mockUserService.getUser.mockResolvedValueOnce(mockUsers);

      // Act
      const users = await userController.findAll('1');

      // Assert
      expect(users).toEqual(mockUsers);
    });

    it('should get users with a search query', async () => {
      // Arrange
      const mockUsers = { name: 'John' };
      mockUserService.getUsersByQuery.mockResolvedValueOnce([mockUsers[0]]);

      // Act
      const users = await userController.findAll('John');

      // Assert'
      expect(users).toEqual([mockUsers[0]]);
    });

    // Add more test cases for different search criteria combinations (optional)
  });

  describe('getUser', () => {
    it('should get a user by ID', async () => {
      // Arrange
      const mockUser = {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        age: 30,
      };
      mockUserService.getUser.mockResolvedValueOnce(mockUser);

      // Act
      const user = await userController.getUser('1');

      // Assert
      expect(user).toEqual(mockUser);
    });
  });

  describe('addUser', () => {
    it('should add a new user with valid data', async () => {
      // Arrange
      const newUser: AddUserDto = {
        name: 'Alice',
        email: 'alice@example.com',
        age: 28,
      };
      const mockUser = { id: '3', ...newUser }; // Add ID after creation
      mockUserService.addUser.mockResolvedValueOnce(mockUser);

      // Act
      const createdUser = await userController.addUser(newUser);

      // Assert
      expect(createdUser).toEqual(mockUser);
    });

    it('should throw an error for invalid user data (missing name)', async () => {
      // Arrange
      const invalidUser: Partial<AddUserDto> = {
        email: 'invalid@example.com',
        age: 28,
      }; // Missing name

      // Act & Assert
      await expect(
        userController.addUser(invalidUser as AddUserDto),
      ).rejects.toThrowError();
    });

    // Add more test cases for other invalid data scenarios (optional)
  });

  describe('updateUser', () => {
    it('should update a user with valid data', async () => {
      // Arrange
      const userId = '1';
      const updateData: UpdateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 0,
      };
      const updatedUser = { id: userId, ...updateData };
      mockUserService.updateUser.mockResolvedValueOnce(updatedUser);

      // Act
      const result = await userController.updateUser(updateData, userId);

      // Assert
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error for invalid update data (missing email)', async () => {
      // Arrange
      const userId = '1';
      const invalidUpdateData: Partial<UpdateUserDto> = { name: 'John Doe' }; // Missing email

      // Act & Assert
      await expect(
        userController.updateUser(invalidUpdateData as UpdateUserDto, userId),
      ).rejects.toThrowError();
    });

    // Add more test cases for other invalid data scenarios (optional)
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      // Arrange
      const userId = '1';
      mockUserService.deleteUser.mockResolvedValueOnce({
        id: userId,
        name: 'John',
        email: 'john@example.com',
        age: 30,
      });

      // Act
      const result = await userController.deleteUser(userId);

      // Assert
      expect(result).toEqual({
        id: userId,
        name: 'John',
        email: 'john@example.com',
        age: 30,
      });
    });

    it('should throw an error if user ID does not exist', async () => {
      // Arrange
      const nonExistentUserId = '999';
      mockUserService.deleteUser.mockResolvedValueOnce(null);

      // Act & Assert
      await expect(
        userController.deleteUser(nonExistentUserId),
      ).rejects.toThrowError();
    });
  });
});
