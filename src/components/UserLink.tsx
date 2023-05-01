import { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  user: User;
  selectedUser: User | null;
  handleSelectedUser: (user: User) => void;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
};

export const UserLink: FC<Props> = ({
  user,
  selectedUser,
  handleSelectedUser,
  setIsMenuOpen,
}) => {
  const handleOnClickUser = () => {
    handleSelectedUser(user);
    setIsMenuOpen(false);
  };

  return (
    <a
      href={`#user-${user.id}`}
      className={
        classNames('dropdown-item', {
          'is-active': selectedUser?.id === user.id,
        })
      }
      onClick={handleOnClickUser}
    >
      {user.name}
    </a>
  );
};
