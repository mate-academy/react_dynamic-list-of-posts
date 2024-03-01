import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Context } from '../context/Context';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const { users, setSelectedUser, selectedUser } = useContext(Context);
  const [listOpen, setListOpen] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setListOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setListOpen(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      onBlur={handleBlur}
      className={cn('dropdown', {
        'is-active': listOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setListOpen(!listOpen)}
        >
          <span>
            {selectedUser !== null ? selectedUser.name : 'Choose a user'}
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
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
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
