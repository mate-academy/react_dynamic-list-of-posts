import React, { useContext } from 'react';
import classNames from 'classnames';
import { MainContext } from '../MainContext';
import { Load } from '../../types/Load';

type Props = {
  id: number
  name: string
  setIsMenu: (val: boolean) => void
  setUserName: (val: string) => void
};

export const UserPerson: React.FC<Props> = ({
  id,
  name,
  setIsMenu,
  setUserName,
}) => {
  const {
    currentUser,
    setCurrentUser,
    setComments,
    setLoadType,
    setCurrentPost,
    setNotification,
  } = useContext(MainContext);

  const handleClick = () => {
    if (id === currentUser) {
      setIsMenu(false);

      return;
    }

    setLoadType(Load.Posts);
    setIsMenu(false);
    setComments([]);
    setNotification('');
    setCurrentPost(null);
    setUserName(name);
    setCurrentUser(id);
  };

  return (
    <a
      href={`#user-${id}`}
      className={classNames(
        'dropdown-item', { 'is-active': currentUser === id },
      )}
      onClick={handleClick}
    >
      {name}
    </a>
  );
};
