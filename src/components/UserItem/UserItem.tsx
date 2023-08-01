import { useContext } from 'react';

import classNames from 'classnames';

import { User } from '../../types/User';
import { PostContext } from '../../context/PostContext';

type Props = {
  user: User;
};

export const UserItem: React.FC<Props> = ({ user }) => {
  const {
    selectedUser,
    setSelectedUser,
    setDropdown,
    setSelectedPost,
  } = useContext(PostContext);

  return (
    <a
      href="#user-1"
      className={classNames('dropdown-item', {
        'is-active': user.id === selectedUser?.id,
      })}
      onClick={() => {
        setSelectedPost(null);
        setSelectedUser(user);
        setDropdown(false);
      }}
    >
      {user.name}
    </a>
  );
};
