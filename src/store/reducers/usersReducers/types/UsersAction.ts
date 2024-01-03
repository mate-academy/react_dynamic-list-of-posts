import { Actions } from '../../../../libs/enums';
import { User } from '../../../../libs/types';

export type UsersAction =
  {
    type: Actions.LoadUsers,
    payload: { users: User[] }
  }
  | {
    type: Actions.SetUser,
    payload: { selectedUser: User | null }
  };
