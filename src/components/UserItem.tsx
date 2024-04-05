import classNames from 'classnames';
import React, { useContext } from 'react';
import { loadPosts } from '../utils/requests';
import { DispatchContext } from '../Store';
import { User } from '../types/User';

type Props = {
  user: User;
  setIsOpen: (isOpen: boolean) => void;
  selectedUserId: number | null;
};

export const UserItem: React.FC<Props> = ({
  user,
  setIsOpen,
  selectedUserId,
}) => {
  const dispatch = useContext(DispatchContext);

  const handleOnClick = (id: number) => {
    dispatch({ type: 'toggleSideBar', payload: false });
    dispatch({ type: 'setUser', id });
    loadPosts(dispatch, id);
    setIsOpen(false);
  };

  return (
    <a
      key={user.id}
      href={`#user-{user.id}`}
      className={classNames('dropdown-item', {
        'is-active': user.id === selectedUserId,
      })}
      onClick={() => handleOnClick(user.id)}
    >
      {user.name}
    </a>
  );
};
