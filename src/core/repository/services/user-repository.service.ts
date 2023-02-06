import { Injectable } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';
import { Repository } from '../repository';
import { v4 as randomId } from 'uuid';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class UserRepositoryService extends Repository<User> {
  constructor() {
    super();
  }

  getByLogin(login: string): User | null {
    const user = this.data.find((user) => user.login === login);
    if (user) {
      return { ...user };
    }
    return null;
  }

  create(entity: CreateUserDto): User {
    const currentDateInMs = Date.now();
    const newUser: User = {
      ...entity,
      id: randomId(),
      version: 1,
      createdAt: currentDateInMs,
      updatedAt: currentDateInMs,
    };
    this.data.push(newUser);
    return { ...newUser };
  }
}
