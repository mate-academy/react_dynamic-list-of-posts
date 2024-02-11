import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
  onChange = () => { },
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const onDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', onDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [expanded]);

  const handleUserItemClick = (user: User) => {
    onChange(user);
    setExpanded(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': expanded,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={(event) => {
            event.stopPropagation();
            setExpanded(prev => !prev);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleUserItemClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
