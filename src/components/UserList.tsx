import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserListProps {
  users: User[];
  selectedUser: User | null;
  handleChoseUser: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  selectedUser,
  handleChoseUser,
}) => {
  return (
    <div className="dropdown-content">
      {users.map((postItem) => (
        <a
          key={postItem.id}
          href={`#user-${postItem.id}`}
          className={classNames('dropdown-item', {
            'is-active': selectedUser?.id === postItem.id,
          })}
          onClick={() => handleChoseUser(postItem)}
        >
          {postItem.name}
        </a>
      ))}
    </div>
  );
};
