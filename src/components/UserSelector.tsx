import React, { useEffect, useState } from 'react';
import { getUsers } from '../utils/services';
import { User } from '../types/User';
import cn from 'classnames';

interface Props {
  onUserSelect: (userId: number) => void;
  selectedUserId: number | null;
}

export const UserSelector: React.FC<Props> = ({
  onUserSelect,
  selectedUserId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
    });
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Choose a user</span>

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
                className={cn('dropdown-item', {
                  'is-active': selectedUserId === user.id,
                })}
                onClick={() => {
                  onUserSelect(user.id);
                  setIsOpen(false);
                }}
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
