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
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    getUsers()
      .then(setUsers)
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!expanded) {
      return undefined;
    }

    const onDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [expanded]);

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
          className={cn('button', {
            'is-loading': !loaded,
          })}
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
              onClick={() => {
                onChange(user);
                setExpanded(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
