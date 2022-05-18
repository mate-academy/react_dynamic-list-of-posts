import React from 'react';
import './UserSelect.scss';

type Props = {
  users: User[],
  setUserId: (userId: number) => void,
};

export const UserSelect: React.FC<Props> = ({ users, setUserId }) => {
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+(event.target.value));
  };

  return (
    <label htmlFor="userSelect" className="UserSelect__label">
      Select a user: &nbsp;
      <select
        id="userSelect"
        className="App__user-selector"
        onChange={onChangeSelect}
      >
        <option value={0}>
          All users
        </option>

        {users.map((user) => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};
