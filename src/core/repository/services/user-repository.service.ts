import { Injectable } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';
import { Repository } from '../repository.interface';
import { v4 as randomId } from 'uuid';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class UserRepositoryService implements Repository<User> {
  private users: Array<User> = [];

  getAll(): Array<User> {
    return JSON.parse(JSON.stringify(this.users));
  }

  getById(id: string): User | null {
    const user = this.users.find((user) => user.id === id);
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
    this.users.push(newUser);
    return { ...newUser };
  }

  update(entity: User): User {
    this.users = this.users.filter((user) => user.id !== entity.id);
    this.users.push(entity);
    return { ...entity };
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
