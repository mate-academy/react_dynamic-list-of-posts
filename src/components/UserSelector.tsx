import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  user: User | null;
  users: User[];
  onSelect: (user: User) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  user,
  users,
  onSelect,
}) => {
  const [showList, setShowList] = useState(false);

  const handleUserClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    linkUser: User,
  ) => {
    event.preventDefault();
    onSelect(linkUser);
    setShowList(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showList })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowList(!showList)}
          onBlur={event => {
            if (!showList) {
              return;
            }

            const focusedElement = event.relatedTarget;

            if (!focusedElement?.matches('a.dropdown-item')) {
              setShowList(false);
            }
          }}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(listUser => (
            <a
              key={listUser.id}
              href={`#user-${listUser.id}`}
              className={classNames('dropdown-item', {
                'is-active': listUser.id === user?.id,
              })}
              onClick={event => handleUserClick(event, listUser)}
            >
              {listUser.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
