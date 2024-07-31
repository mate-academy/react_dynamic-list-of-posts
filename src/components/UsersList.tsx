import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setIsDropdownOpened: (opened: boolean) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UsersList: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setIsDropdownOpened,
  setSelectedPost,
}) => {
  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    setIsDropdownOpened(false);
    setSelectedPost(null);
  };

  return (
    <>
      {users.map(user => (
        <a
          key={user.id}
          href={`#user-${user.id}`}
          className={classNames('dropdown-item', {
            'is-active': selectedUser?.id === user.id,
          })}
          onClick={() => handleSelectedUser(user)}
        >
          {user.name}
        </a>
      ))}
    </>
  );
};
