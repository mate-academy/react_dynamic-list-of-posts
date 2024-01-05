import { FC } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { useAppContext } from '../context/AppContext';

type Props = {
  user: User,
};

export const UserItem: FC<Props> = ({ user }) => {
  const { selectUser, selectedUser } = useAppContext();

  const handleClickUser = () => {
    selectUser(user);
  };

  const isThisSelectedUser = selectedUser && selectedUser.id === user.id;

  return (
    <a
      onClick={handleClickUser}
      href={`#user-${user.id}`}
      className={cn('dropdown-item', {
        'is-active': isThisSelectedUser,
      })}
    >
      {user.name}
    </a>
  );
};
