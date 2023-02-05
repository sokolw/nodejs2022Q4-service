import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepositoryService } from '../repository/services/user-repository.service';
import { DecodedUser } from './types/decoded-user';
import { UserRequest } from './types/user-request';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userRepositoryService: UserRepositoryService) {}

  use(req: UserRequest, res: Response, next: NextFunction) {
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
        const user = this.userRepositoryService.getById(decodedUser.id);
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
