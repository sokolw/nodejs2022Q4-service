import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { INVALID_LOGIN_PASSWORD, LOGIN_EXIST } from 'src/core/constants';
import { UserRepositoryService } from 'src/core/repository/services/user-repository.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/interfaces/user.interface';
import { UserResponse } from 'src/user/types/user-response.type';
import { JwtResponse } from './types/jwt-response';

@Injectable()
export class AuthService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const existUser = this.userRepositoryService.getByLogin(
      createUserDto.login,
    );
    if (existUser) {
      throw new HttpException({ message: LOGIN_EXIST }, HttpStatus.CONFLICT);
    }
    const passwordHash = await this.getPasswordHash(createUserDto.password);
    this.userRepositoryService.create({
      ...createUserDto,
      password: passwordHash,
    });
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
