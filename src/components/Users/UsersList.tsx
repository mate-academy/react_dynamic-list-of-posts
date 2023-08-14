import { FC } from 'react';
import classNames from 'classnames';
import { useUsersContext } from '../../hooks';
import { User } from '../../types';

type Props = {
  onCloseDropdown: () => void;
};

export const UsersList: FC<Props> = ({ onCloseDropdown }) => {
  const { onSelectUser, selectedUser, users } = useUsersContext();

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    onCloseDropdown();
  };

  return (
    <>
      {users.map((user) => (
        <a
          href={`#user-${user.id}`}
          className={classNames('dropdown-item', {
            'is-active': selectedUser?.id === user.id,
          })}
          key={user.id}
          onClick={() => handleSelectUser(user)}
        >
          {user.name}
        </a>
      ))}
    </>
  );
};
