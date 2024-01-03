import { User } from '../../../../libs/types';

export type UsersState = {
  users: User[],
  selectedUser: User | null,
};
