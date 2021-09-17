import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<number>>;
};

export const UserSelect: React.FC<Props> = (props) => {
  const { setUser } = props;
  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data));
  }, []);

  return (
    users && (
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          onChange={(event) => {
            setUser(+event.target.value);
          }}
        >
          <option value="0">All users</option>
          {users.map((user: User) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </label>
    )
  );
};
