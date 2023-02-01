import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import {
  INVALID_ID,
  OLD_PASSWORD_WRONG,
  USER_NOT_EXIST,
} from 'src/core/constants';
import { UserRepositoryService } from 'src/core/repository/services/user-repository.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interfaces/user.interface';
import { UserResponse } from './types/user-response.type';
import { validate } from 'uuid';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UserService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  async getAllUsers(): Promise<Array<UserResponse>> {
    const users = this.userRepositoryService.getAll();
    return this.buildUserResponse(users) as Promise<Array<UserResponse>>;
  }

  async getUserById(id: string): Promise<UserResponse> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepositoryService.getById(id);
    if (user) {
      return this.buildUserResponse(user) as Promise<UserResponse>;
    }

    throw new HttpException({ message: USER_NOT_EXIST }, HttpStatus.NOT_FOUND);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    const passwordHash = await this.getPasswordHash(createUserDto.password);
    const createdUser = this.userRepositoryService.create({
      ...createUserDto,
      password: passwordHash,
    });
    return this.buildUserResponse(createdUser) as Promise<UserResponse>;
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepositoryService.getById(id);
    if (user === null) {
      throw new HttpException(
        { message: USER_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordCorrect = await compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        { message: OLD_PASSWORD_WRONG },
        HttpStatus.FORBIDDEN,
      );
    }

    const newPasswordHash = await this.getPasswordHash(
      updatePasswordDto.newPassword,
    );
    const updatedUser: User = {
      ...user,
      version: ++user.version,
      updatedAt: Date.now(),
      password: newPasswordHash,
    };

    const userAfterUpdate = this.userRepositoryService.update(updatedUser);
    return this.buildUserResponse(userAfterUpdate) as Promise<UserResponse>;
  }

  async deleteUser(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepositoryService.getById(id);
    if (user === null) {
      throw new HttpException(
        { message: USER_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    this.userRepositoryService.delete(id);
  }

  async getPasswordHash(password: string): Promise<string> {
    return hash(password, +process.env.CRYPT_SALT);
  }

  async buildUserResponse(
    args: User | Array<User>,
  ): Promise<UserResponse | Array<UserResponse>> {
    if (Array.isArray(args)) {
      return args.map<UserResponse>((user) => {
        delete user.password;
        return { ...user };
      });
    } else {
      delete args.password;
      return args;
    }
  }
}
