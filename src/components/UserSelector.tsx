import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Context } from '../context/Context';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const { users, selectedUserId, setSelectedPost, setSelectedUserId } =
    useContext(Context);

  const [isListShown, setIsListShown] = useState(false);

  const selectedUser: User | undefined = users.find(
    user => user.id === selectedUserId,
  );

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setIsListShown(false);
    setSelectedPost(null);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsListShown(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isListShown,
      })}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsListShown(!isListShown)}
        >
          <span>{selectedUserId ? selectedUser?.name : 'Choose a user'}</span>

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
              key={user.id}
              className={cn('dropdown-item', {
                'is-active': selectedUserId === user.id,
              })}
              onClick={() => handleUserSelect(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
