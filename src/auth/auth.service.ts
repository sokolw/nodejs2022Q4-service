import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { INVALID_LOGIN_PASSWORD, LOGIN_EXIST } from 'src/core/constants';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtResponse } from './classes/jwt-response';
import { Repository } from 'typeorm';
import { SignupResponse } from './classes/signup-response';
import { User } from 'src/user/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { DecodedUser } from 'src/core/middlewares/types/decoded-user';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<SignupResponse> {
    try {
      const user = Object.assign(new User(), createUserDto);
      const createdUser = await this.userRepository.save(user);
      return { id: createdUser.id };
    } catch {
      throw new HttpException({ message: LOGIN_EXIST }, HttpStatus.CONFLICT);
    }
  }

  async login(loginUserDto: CreateUserDto): Promise<JwtResponse> {
    const existUser = await this.userRepository.findOneBy({
      login: loginUserDto.login,
    });
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

    const userPayload = {
      id: existUser.id,
      login: existUser.login,
    };

    const accessToken = this.createToken(
      userPayload,
      process.env.JWT_SECRET_KEY,
      process.env.TOKEN_EXPIRE_TIME,
    );

    const refreshToken = this.createToken(
      userPayload,
      process.env.JWT_SECRET_REFRESH_KEY,
      process.env.TOKEN_REFRESH_EXPIRE_TIME,
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<JwtResponse> {
    const decodedUser = verify(
      refreshTokenDto.refreshToken,
      process.env.JWT_SECRET_REFRESH_KEY,
    ) as DecodedUser;

    const userPayload = {
      id: decodedUser.id,
      login: decodedUser.login,
    };

    const accessToken = this.createToken(
      userPayload,
      process.env.JWT_SECRET_KEY,
      process.env.TOKEN_EXPIRE_TIME,
    );

    const refreshToken = this.createToken(
      userPayload,
      process.env.JWT_SECRET_REFRESH_KEY,
      process.env.TOKEN_REFRESH_EXPIRE_TIME,
    );

    return { accessToken, refreshToken };
  }

  createToken(payload: object, secret: string, expireTime: string): string {
    return sign(payload, secret, { expiresIn: expireTime });
  }
}
