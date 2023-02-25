import { User } from 'src/user/interfaces/user.interface';

export type DecodedUser = Omit<
  User,
  'password' | 'version' | 'createdAt' | 'updatedAt'
>;
