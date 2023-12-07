import React, { useContext } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { GlobalContext } from '../GlobalContetxt';

type Props = {
  user: User;
};

export const UserDetails: React.FC<Props> = ({ user }) => {
  const {
    setUserName,
    userId,
    setUserId,
    setIsLoadingPosts,
    postId,
    setComments,
    setPostId,
    setIsActiveDropdown,
  } = useContext(GlobalContext);

  const handleSelectUser = () => {
    if (postId) {
      setComments([]);
      setPostId(0);
    }

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
