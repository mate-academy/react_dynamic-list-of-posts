import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { User } from '../types/User';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  setCurrentPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  currentUser,
  setCurrentUser,
  setCurrentPost,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelectUser = (user: User) => {
    setCurrentPost(null);
    setCurrentUser(user);
    setIsOpen(false);
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={componentRef}
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(open => !open)}
        >
          <span>{currentUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': currentUser?.id === user.id,
                })}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
