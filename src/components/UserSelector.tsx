import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleUserSelect = (user: User) => {
    onSelectUser(user);
    setIsExpanded(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isExpanded })}
      ref={selectorRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsExpanded(current => !current)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
