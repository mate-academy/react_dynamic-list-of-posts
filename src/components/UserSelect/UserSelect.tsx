import { FC } from 'react';

type Props = {
  users: User[],
  currentUserId: number,
  onChangeUserId: (id: number) => void,
};
export const UserSelect: FC<Props> = ({
  users,
  currentUserId,
  onChangeUserId,
}) => (
  <label htmlFor="selectUser">
    Select a user: &nbsp;

    <select
      className="App__user-selector"
      id="selectUser"
      value={currentUserId}
      onChange={event => onChangeUserId(+event.target.value)}
    >
      <option value="0">
        All users
      </option>
      {users.map(user => (
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
