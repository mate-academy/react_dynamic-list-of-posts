import React from 'react';
import cl from 'classnames';
import { User } from '../types/User';

interface Props {
  user: User,
  selectedUser: User | null,
  onUserSelect: (value: User) => void,
}

const UserItem: React.FC<Props> = ({ user, selectedUser, onUserSelect }) => {
  return (
    <a
      href={`#user-${user.id}`}
      className={cl(
        'dropdown-item',
        { 'is-active': selectedUser?.id === user.id },
      )}
      onClick={() => onUserSelect(user)}
    >
      {user.name}
    </a>
  );
};

export default UserItem;
