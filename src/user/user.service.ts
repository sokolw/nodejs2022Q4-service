import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { compare } from 'bcrypt';
import {
  INVALID_ID,
  LOGIN_EXIST,
  OLD_PASSWORD_WRONG,
  USER_NOT_EXIST,
} from 'src/core/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './classes/user-response';
import { validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<Array<UserResponse>> {
    const users = await this.userRepository.find();
    return users.map((user) => this.transformUserEntity(user));
  }

  async getUserById(id: string): Promise<UserResponse> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return this.transformUserEntity(user);
    }

    throw new HttpException({ message: USER_NOT_EXIST }, HttpStatus.NOT_FOUND);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const user = Object.assign(new User(), createUserDto);
      const createdUser = await this.userRepository.save(user);
      return this.transformUserEntity(createdUser);
    } catch {
      throw new HttpException({ message: LOGIN_EXIST }, HttpStatus.CONFLICT);
    }
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });
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

    const updatedUser = await this.userRepository.save(
      Object.assign(user, { password: updatePasswordDto.newPassword }),
    );

    return this.transformUserEntity(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) {
      throw new HttpException(
        { message: USER_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.remove(user);
  }

  private transformUserEntity(entity: User): UserResponse {
    delete entity.password;
    return {
      ...entity,
      createdAt: +entity.createdAt,
      updatedAt: +entity.updatedAt,
    };
  }
}
