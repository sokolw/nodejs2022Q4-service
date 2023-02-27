import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { DecodedUser } from './types/decoded-user';
import { UserRequest } from './types/user-request';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        req.user = null;
        next();
        return;
      } else {
        const token = req.headers.authorization.replace(`Bearer `, '');
        const decodedUser = verify(
          token,
          process.env.JWT_SECRET_KEY,
        ) as DecodedUser;
        const user = await this.userRepository.findOneBy({
          id: decodedUser.id,
        });
        if (user) {
          req.user = user;
          next();
          return;
        }
        req.user = null;
        next();
        return;
      }
    } catch (error) {
      next();
      return;
    }
  }
}
