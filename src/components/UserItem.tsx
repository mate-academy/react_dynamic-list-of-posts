import React, { useContext } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { GlobalContext } from '../GlobalContext';

type Props = {
  user: User,
  setIsActiveDropdown: (b: boolean) => void,
};

export const UserItem: React.FC<Props> = ({ user, setIsActiveDropdown }) => {
  const { selectedUser, setSelectedUser } = useContext(GlobalContext);

  const handleSelectedUser = (u: User) => {
    setSelectedUser(u);
    setIsActiveDropdown(false);
  };

  return (
    <a
      key={user.id}
      href={`#user-${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': user.id === selectedUser?.id,
      })}
      onClick={() => handleSelectedUser(user)}
    >
      {user.name}
    </a>
  );
};
