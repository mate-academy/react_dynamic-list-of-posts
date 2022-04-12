/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  memo,
  FC,
  ChangeEvent,
} from 'react';
import { User } from '../../types/User';

type Props = {
  selectedUserId: number,
  users: User[],
  onChangeUser: (event: ChangeEvent<HTMLSelectElement>) => void,
};

export const Header: FC<Props> = memo(({
  selectedUserId, onChangeUser, users,
}) => {
  return (
    <header className="App__header">
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          value={selectedUserId}
          onChange={onChangeUser}
        >
          <option value="0">All users</option>
          {users.map(user => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
      </label>
    </header>
  );
});
