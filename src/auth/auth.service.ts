import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { INVALID_LOGIN_PASSWORD, LOGIN_EXIST } from 'src/core/constants';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { UserResponse } from 'src/user/classes/user-response';
import { JwtResponse } from './types/jwt-response';
import { UserService } from './../user/user.service';

abstract class UserRepositoryService {
  abstract getById(id: string);
  abstract getByLogin(login: string);
}

@Injectable()
export class AuthService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private userService: UserService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const existUser = this.userRepositoryService.getByLogin(
      createUserDto.login,
    );
    if (existUser) {
      throw new HttpException({ message: LOGIN_EXIST }, HttpStatus.CONFLICT);
    }

    this.userService.createUser(createUserDto);
  }

  async login(loginUserDto: CreateUserDto): Promise<JwtResponse> {
    const existUser = this.userRepositoryService.getByLogin(loginUserDto.login);
    if (!existUser) {
      throw new HttpException(
        { message: INVALID_LOGIN_PASSWORD },
        HttpStatus.FORBIDDEN,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      existUser.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException(
        { message: INVALID_LOGIN_PASSWORD },
        HttpStatus.FORBIDDEN,
      );
    }

    const token = sign(
      {
        id: existUser.id,
        login: existUser.login,
      },
      process.env.JWT_SECRET_KEY,
    );

    return { accessToken: token };
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
