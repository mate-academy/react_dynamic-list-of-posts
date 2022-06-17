import React, { ChangeEventHandler, useEffect, useState } from 'react';
// Types
import { User } from '../../types/User';
import { ChangeId } from '../../types/ChangeId';
// Api requests
import { getUsers } from '../../api/users';

type Props = {
  changeUserId: ChangeId;
  changePostId: ChangeId;
};

export const UserSelect: React.FC<Props> = ({ changeUserId, changePostId }) => {
  const [users, setUsers] = useState<[] | User[]>([]);

  useEffect(() => {
    getUsers().then(receivedUsers => setUsers(receivedUsers));
  }, []);

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = +e.target.value;

    changeUserId(value);
    changePostId(0);
  };

  return (
    <label htmlFor="userSelect">
      Select a user: &nbsp;

      <select
        id="userSelect"
        className="App__user-selector"
        onChange={changeHandler}
      >
        <option value="0">All users</option>

        {users.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
    </label>
  );
};
