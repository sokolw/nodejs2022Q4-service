import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { verify } from 'jsonwebtoken';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class ValidationJwtTokenPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Body request is invalid.');
    }

    try {
      verify(
        (object as RefreshTokenDto).refreshToken,
        process.env.JWT_SECRET_REFRESH_KEY,
      );
    } catch (error) {
      throw new HttpException(
        { message: 'Refresh token is invalid or expired.' },
        HttpStatus.FORBIDDEN,
      );
    }

    return value;
  }
}
