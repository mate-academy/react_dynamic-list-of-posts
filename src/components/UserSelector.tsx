import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  users: User[],
  onLoadPosts: (id:number) => void,
  selectedUserId: number | null,
}

export const UserSelector: React.FC<Props> = ({
  users,
  onLoadPosts,
  selectedUserId,
}) => {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectUserName = users.find(user => (user.id === selectedUserId))?.name;

  const handleOnBlur = (event: MouseEvent) => {
    if (menuRef.current
      && !menuRef.current.contains(event.target as HTMLElement)) {
      setIsActive(false);
    }
  };

  const handleOpenListUsers = () => {
    setIsActive(!isActive);
  };

  const hendleLoadPosts = (id: number) => {
    onLoadPosts(id);
    setIsActive(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleOnBlur);

    return () => {
      document.removeEventListener('click', handleOnBlur);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenListUsers}
        >
          <span>
            {!selectedUserId
              ? 'Choose a user'
              : selectUserName}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': selectUserName === user.name },
              )}
              onClick={() => hendleLoadPosts(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
