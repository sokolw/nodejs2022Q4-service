import { Request } from 'express';
import { User } from './../../../user/interfaces/user.interface';

export type UserRequest = Request & { user: User };
