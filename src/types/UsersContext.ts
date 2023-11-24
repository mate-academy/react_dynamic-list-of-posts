import { User } from './User';

export interface UsersContext {
  users: User[];
  setUsers: (v: User[]) => void;
  selectedUser: User | null;
  setSelectedUser: (v: User) => void;
}
