import React, { useContext } from 'react';
import { User } from '../../types/User';
import classNames from 'classnames';
import { CurrentUserContext } from '../../Context/CurrentUserContext';
import { CurrentPostContext } from '../../Context/CurrentPostContext';

type UserItemProps = {
  user: User;
  handleSelectUser: (userId: User['id']) => void;
};

export const UserItem: React.FC<UserItemProps> = ({
  user,
  handleSelectUser,
}) => {
  const { selectedUser, setSelectedUser, setVisibleUsers } =
    useContext(CurrentUserContext);

  const { setUnactivePost } = useContext(CurrentPostContext);

  const onSelect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    userItem: User,
  ) => {
    event.preventDefault();
    setUnactivePost(true);
    setSelectedUser(userItem);
    handleSelectUser(userItem.id);
    setVisibleUsers(false);
  };

  return (
    <a
      href={`#user-${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': selectedUser && user.id === selectedUser.id,
      })}
      onClick={event => onSelect(event, user)}
    >
      {user.name}
    </a>
  );
};
