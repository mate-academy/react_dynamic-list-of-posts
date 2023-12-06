import React, { useContext } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { GlobalContext } from '../GlobalContetxt';

type Props = {
  user: User;
  setIsActiveDropdown: (b: boolean) => void;
};

export const UserDetails: React.FC<Props> = ({
  user,
  setIsActiveDropdown = () => {},
}) => {
  const {
    setUserName,
    userId,
    setUserId,
    setIsLoadingPosts,
  } = useContext(GlobalContext);

  const handleSelectUser = () => {
    setUserName(user.name);
    setIsActiveDropdown(false);
    setUserId(user.id);
    setIsLoadingPosts(true);
  };

  return (
    <a
      href={`#user-${user.id}`}
      className={classNames(
        'dropdown-item',
        { 'is-active': user.id === userId },
      )}
      onClick={handleSelectUser}
    >
      {user.name}
    </a>
  );
};
