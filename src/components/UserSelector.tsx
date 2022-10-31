import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[]
  showPosts: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, showPosts }) => {
  const [isUser, setIsUser] = useState<User>();
  const [showUser, setShowUser] = useState(false);
  const menuRef = useRef(null);

  const handleChooseUser = (user: User) => {
    setIsUser(user);
    showPosts(user);
    setShowUser(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': showUser },
      )}
      ref={menuRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowUser(!showUser)}
        >
          <span>{!isUser ? 'Choose a user' : isUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames(
                  'dropdown-item', { 'is-active': user.id === isUser?.id },
                )}
                onClick={() => handleChooseUser(user)}
              >
                {user.name}
              </a>
            ))
          }

        </div>
      </div>
    </div>
  );
};
