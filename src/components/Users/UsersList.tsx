import React, { useContext } from 'react';
import classNames from 'classnames';
import { MainContext } from '../MainContext';
import { Load } from '../../types/Load';
import { useOuterClick } from '../../hooks/useOuterClick';

type Props = {
  setIsMenu: (val: boolean) => void
  setUserName: (val: string) => void
};

export const UsersList: React.FC<Props> = ({ setIsMenu, setUserName }) => {
  const {
    users,
    currentUser,
    setCurrentUser,
    setComments,
    setLoadType,
    setCurrentPost,
    setNotification,
  } = useContext(MainContext);

  const reff = useOuterClick(() => {
    setIsMenu(false);
  });

  const handleClick = (id: number, name: string) => {
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
    <div
      ref={reff}
      className="dropdown-menu"
      id="dropdown-menu"
      role="menu"
    >
      <div className="dropdown-content">
        {users?.map(user => (
          <a
            key={user.id}
            href={`#user-${user.id}`}
            className={classNames('dropdown-item', {
              'is-active': currentUser === user.id,
            })}
            onClick={() => handleClick(user.id, user.name)}
          >
            {user.name}
          </a>
        ))}
      </div>
    </div>
  );
};
